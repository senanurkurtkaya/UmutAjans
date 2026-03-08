import { NextRequest } from "next/server";

// GET By ID - GET /api/services/:id
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }) {

}

// UPDATE By ID - PUT /api/services/:id
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }) {

}

export async function DELETE(request: NextRequest) {

}