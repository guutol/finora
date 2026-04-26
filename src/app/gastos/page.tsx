"use client";

import { useState, useEffect } from "react";

type Gasto = {
  id: number;
  nome: string;
  valor: number;
};

export default function Gastos() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [gastos, setGastos] = useState<Gasto[]>([]);

  async function adicionarGasto() {
    if (!nome || !valor) return;

    const res = await fetch("/api/gastos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        valor,
      }),
    });

    const novoGasto = await res.json();

    setGastos([...gastos, novoGasto]);

    setNome("");
    setValor("");
  }

  function removerGasto(id: number) {
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
          onClick={adicionarGasto}
        >
          Adicionar gasto
        </button>
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="mb-4 text-xl font-semibold">Lista de gastos</h2>

        <ul className="flex flex-col gap-3">
          {gastos.map((gasto) => (
            <li
              key={gasto.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span>{gasto.nome}</span>

              <div className="flex gap-4 items-center">
                <span>R$ {gasto.valor.toFixed(2)}</span>

                <button
                  className="text-red-500"
                  onClick={() => removerGasto(gasto.id)}
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
