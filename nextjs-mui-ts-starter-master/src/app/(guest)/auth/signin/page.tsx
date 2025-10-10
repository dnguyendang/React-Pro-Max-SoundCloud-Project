import AuthSignIn from '@/components/auth/auth.signin';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

const SignInPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
        // redirect to homepage

    }
    return (
        <AuthSignIn />
    );
}
export default SignInPage;