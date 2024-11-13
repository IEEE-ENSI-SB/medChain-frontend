import { Mail, Lock } from "lucide-react";

const SignIn = () => {
    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="w-full max-w-md bg-[#121212] p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold mb-6 text-white">
                    Hi there 👋
                </h1>
                <p className="text-gray-400 mb-8">Register with your email and password.</p>
                
                <form>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2 text-white">Email</label>
                        <div className="flex items-center bg-[#222222] p-3 rounded-lg">
                            <Mail className="text-gray-400 mr-3" />
                            <input
                                type="email"
                                placeholder="johndoe@example.com"
                                className="bg-transparent flex-1 text-white outline-none"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2 text-white">Password</label>
                        <div className="flex items-center bg-[#222222] p-3 rounded-lg">
                            <Lock className="text-gray-400 mr-3" />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="bg-transparent flex-1 text-white outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 p-3 rounded-lg text-white font-semibold hover:bg-green-600 transition">
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignIn;