import { NextRequest, NextResponse } from 'next/server'

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(signInURL, {
      // request.url é a url original que o usuário está tentando acessar
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20`, // quando coloco '/' no path toda a aplicação pode acessar esse cookie
      },
    })
  }

  return NextResponse.next() // esse next significa que não quero fazer nada, o usuário vai continuar com sua ação
}

export const config = {
  matcher: '/memories/:path*', // quais endereços da aplicação quero disparar o middleware, ou seja, quais endereços quero obrigar que para o usuário acessar ele tem que estar logado
}
