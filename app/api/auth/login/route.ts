
import axios, { apiUrl } from "@/lib/axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
     const loginUrl =
    `${apiUrl}/auth/login` ||
    "http://localhost:8000/api/v1/auth/login";
try {
  console.log("loginUrl: ", loginUrl);
  
    const body = await request.json();
    const response = await axios.post(loginUrl, {
        login: body.email,
        password: body.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("response: ", response);
      

      return NextResponse.json(response);
    
} catch (error) {
    console.log("error: ", error);
    
    return NextResponse.json(error);
}
    
}