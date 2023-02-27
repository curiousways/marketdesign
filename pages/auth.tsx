/* eslint-disable jsx-a11y/label-has-associated-control */
import { NextPage } from 'next';
import { SyntheticEvent, useCallback } from 'react';
import fetch from 'isomorphic-unfetch';

const Auth: NextPage = () => {
  const onSubmit = useCallback(async (evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const target = evt.target as typeof evt.target & {
      username: { value: string };
      password: { value: string };
    };

    const res = await fetch('/api/auth/sign-in', {
      method: 'POST',
      body: JSON.stringify({
        username: target.username.value,
        password: target.password.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 401) {
      // eslint-disable-next-line no-alert
      window.alert('Invalid login credentials');

      return;
    }

    const { searchParams } = new URL(window.location.href);
    const redirect = searchParams.get('redirect');

    document.cookie = `access_token=${(await res.json()).token}`;
    window.location.href = redirect ?? '/';
  }, []);

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="mb-3 font-bold">Please sign in to continue</div>
      <form className="w-[300px]" onSubmit={onSubmit}>
        <div className="border pt-4 px-5 pb-5">
          <div className="w-full">
            <label className="flex select-none">Username</label>
            <input
              className="border rounded p-2 w-full"
              required
              type="text"
              name="username"
            />
          </div>
          <div className="w-full mt-4">
            <label className="flex select-none">Password</label>
            <input
              className="border rounded p-2 w-full"
              required
              type="password"
              name="password"
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={() => {}}
          className="w-full rounded-lg bg-black text-white text-xs py-2 hover:bg-[#848484] cursor-pointer mt-5"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default Auth;
