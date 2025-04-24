import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();
const API_KEY = process.env.API_KEY;

app.use(express.json());

app.post("/", (req, res) => {
	res.send("OK");
});

app.post("/store", async (req: Request, res: Response) => {
	const { apiKey, namaSensor, jenisDeteksi, nilai } = req.body;

	if (apiKey !== API_KEY) {
		res.sendStatus(401);
		return;
	}

	if (!namaSensor || !jenisDeteksi || nilai === undefined) {
		res.sendStatus(400);
		return;
	}

	try {
		const data = await prisma.data.create({
			data: {
				namaSensor,
				jenisDeteksi,
				nilai,
			},
		});

		res.status(201).json({ message: "Data stored successfully", data });
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
