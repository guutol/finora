import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  const gastos = await prisma.gasto.findMany({
    include: {
      categoria: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  const totalGasto = gastos.reduce((total, gasto) => {
    return total + gasto.valor;
  }, 0);

  const gastosPorCategoria = gastos.reduce(
    (acc, gasto) => {
      const categoria = gasto.categoria?.nome || "Sem categoria";

      if (!acc[categoria]) {
        acc[categoria] = 0;
      }

      acc[categoria] += gasto.valor;

      return acc;
    },
    {} as Record<string, number>
  );

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
          <strong className="text-2xl">
            R$ {totalGasto.toFixed(2)}
          </strong>
        </div>
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="mb-4 text-xl font-semibold">Resumo por categoria</h2>

        <div className="flex flex-col gap-2">
          {Object.entries(gastosPorCategoria).map(([categoria, total]) => (
            <div key={categoria} className="flex justify-between border-b pb-2">
              <span>{categoria}</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="mb-4 text-xl font-semibold">Gastos recentes</h2>

        <ul className="flex flex-col gap-3">
          {gastos.map((gasto) => (
            <li key={gasto.id} className="flex justify-between border-b pb-2">
              <div className="flex flex-col">
                <span>{gasto.nome}</span>
                <span className="text-sm text-gray-500">
                  {gasto.categoria?.nome || "Sem categoria"}
                </span>
              </div>

              <span>R$ {gasto.valor.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}