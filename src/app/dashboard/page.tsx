import { gastos } from "@/data/gastos";

export default function Dashboard() {
  return (
    <main className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-gray-500">Saldo total</p>
          <strong className="text-2xl">R$ 1.000,00</strong>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-gray-500">Total gasto</p>
          <strong className="text-2xl">R$ 150,00</strong>
        </div>
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="mb-4 text-xl font-semibold">Gastos recentes</h2>

        <ul className="flex flex-col gap-3">
          {gastos.map((gasto) => (
            <li key={gasto.id} className="flex justify-between border-b pb-2">
              <span>{gasto.nome}</span>
              <span>R$ {gasto.valor},00</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}