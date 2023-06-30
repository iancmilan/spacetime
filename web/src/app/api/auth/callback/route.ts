import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const registerResponse = await api.post('/register', {
    code,
  })

  const { token } = registerResponse.data

  const redirectUrl = new URL('/', request.url) // request.url contém a url da aplicação

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30 // 60 segundos * 60 minutos = horas * 24 = dias * 30 dias

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`, // quando coloco '/' no path toda a aplicação pode acessar esse cookie
    },
  })
}
