import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectUrl = new URL('/', request.url) // request.url contém a url da aplicação

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0`, // colocando 0, ele vai apagar o cookie do navegador
    },
  })
}
