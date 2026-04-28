import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const categoriaOutros = await prisma.categoria.findFirst({
    where: {
      nome: "Outros",
    },
  });

  if (!categoriaOutros) {
    return Response.json(
      { error: "Categoria Outros não encontrada" },
      { status: 400 },
    );
  }

  const gasto = await prisma.gasto.create({
    data: {
      nome: body.nome,
      valor: Number(body.valor),
      categoriaId: categoriaOutros.id,
    },
  });

  return Response.json(gasto);
}

export async function GET() {
  const gastos = await prisma.gasto.findMany({
    include: {
      categoria: true,
    },
  });

  return Response.json(gastos);
}

export async function DELETE(req: Request) {
  const body = await req.json();

  await prisma.gasto.delete({
    where: {
      id: body.id,
    },
  });

  return Response.json({ message: "Gasto removido com sucesso" });
}
