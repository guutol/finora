"use client";

import { useState, useEffect } from "react";

type Gasto = {
  id: number;
  nome: string;
  valor: number;
  categoria: {
    nome: string;
  };
};

export default function Gastos() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [gastoEditandoId, setGastoEditandoId] = useState<number | null>(null);

  async function salvarGasto() {
    if (!nome || !valor) return;

    if (gastoEditandoId) {
      const res = await fetch("/api/gastos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: gastoEditandoId,
          nome,
          valor: Number(valor),
        }),
      });

      if (!res.ok) {
        console.log("Erro ao atualizar gasto");
        return;
      }

      const gastoAtualizado = await res.json();

      setGastos(
        gastos.map((gasto) =>
          gasto.id === gastoEditandoId ? gastoAtualizado : gasto,
        ),
      );

      setGastoEditandoId(null);
    } else {
      const res = await fetch("/api/gastos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          valor: Number(valor),
        }),
      });

      if (!res.ok) {
        console.log("Erro ao salvar gasto");
        return;
      }

      const novoGasto = await res.json();

      setGastos([...gastos, novoGasto]);
    }

    setNome("");
    setValor("");
  }

  async function removerGasto(id: number) {
    await fetch("/api/gastos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const novaLista = gastos.filter((gasto) => gasto.id !== id);
    setGastos(novaLista);
  }

  useEffect(() => {
    async function carregarGastos() {
      const res = await fetch("/api/gastos");
      const data = await res.json();

      setGastos(data);
    }

    carregarGastos();
  }, []);

  function editarGasto(gasto: Gasto) {
    setNome(gasto.nome);
    setValor(gasto.valor.toString());
    setGastoEditandoId(gasto.id);
  }

  return (
    <main className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold">Gastos</h1>

      <section className="flex flex-col gap-3 rounded-xl border p-4">
        <input
          className="rounded-lg border p-2"
          placeholder="Nome do gasto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          className="rounded-lg border p-2"
          placeholder="Valor"
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        <button
          className="rounded-lg bg-black px-4 py-2 text-white"
          onClick={salvarGasto}
        >
          {gastoEditandoId ? "Salvar edição" : "Adicionar gasto"}
        </button>
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="mb-4 text-xl font-semibold">Lista de gastos</h2>

        <ul className="flex flex-col gap-3">
          {gastos.map((gasto) => (
            <li
              key={gasto.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <span>
                {gasto.nome} ({gasto.categoria.nome})
              </span>

              <div className="flex items-center gap-4">
                <span>R$ {gasto.valor.toFixed(2)}</span>

                <button
                  onClick={() => editarGasto(gasto)}
                  className="text-blue-500"
                >
                  Editar
                </button>

                <button
                  onClick={() => removerGasto(gasto.id)}
                  className="text-red-500"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}