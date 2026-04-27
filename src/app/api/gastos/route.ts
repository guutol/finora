import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const gasto = await prisma.gasto.create({
    data: {
      nome: body.nome,
      valor: Number(body.valor),
    },
  });

  return Response.json(gasto);
}

export async function GET() {
  const gastos = await prisma.gasto.findMany();

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

export async function PUT(req: Request) {
  const body = await req.json();

  const gasto = await prisma.gasto.update({
    where: {
      id: body.id,
    },
    data: {
      nome: body.nome,
      valor: Number(body.valor),
    },
  });

  return Response.json(gasto);
}
