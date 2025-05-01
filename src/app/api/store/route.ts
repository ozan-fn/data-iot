import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const API_KEY = process.env.API_KEY;

export async function POST(req: NextRequest) {
	try {
		const { apiKey, namaSensor, jenisDeteksi, nilai } = await req.json();

		if (apiKey !== API_KEY) {
			return new NextResponse(null, { status: 401 });
		}

		if (!namaSensor || !jenisDeteksi || nilai === undefined) {
			return new NextResponse(null, { status: 400 });
		}

		const data = await prisma.data.create({
			data: {
				namaSensor,
				jenisDeteksi,
				nilai,
			},
		});

		return NextResponse.json({ message: "Data stored successfully", data }, { status: 201 });
	} catch (error) {
		console.error(error);
		return new NextResponse(null, { status: 500 });
	}
}
