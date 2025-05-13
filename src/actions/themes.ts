'use server';

import { cookies } from 'next/headers';

export async function updateTheme(formData: FormData) {
  const cookieStore = await cookies();
  cookieStore.set(
    formData.get('key') as string,
    JSON.stringify({
      colorScheme: formData.get('colorScheme') as string,
      contrast: formData.get('contrast') as string,
    }),
    {
      path: '/multi-store-with-server-persistence',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 600,
    },
  );
}
