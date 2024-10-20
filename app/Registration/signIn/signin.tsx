import { Mail, Phone, User } from "lucide-react";

const SignIn = () => {
    return(
        <div className="bg-[#121212] p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold mb-6">
                Hi there 👋
            </h1>
            <p className="text-gray-400 mb-8">Schedule your first appointment.</p>
            
            <form>
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Full name</label>
                    <div className="flex items-center bg-[#222222] p-3 rounded-lg">
                        <User className="pr-3"/>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="bg-transparent flex-1 text-white outline-none"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <div className="flex items-center bg-[#222222] p-3 rounded-lg">
                        <Mail className="pr-3" />
                        <input
                            type="email"
                            placeholder="johndoe@example.com"
                            className="bg-transparent flex-1 text-white outline-none"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Phone number</label>
                    <div className="flex items-center bg-[#222222] p-3 rounded-lg">
                        <Phone className="pr-3" />
                        <input
                            type="tel"
                            placeholder="+1"
                            className="bg-transparent flex-1 text-white outline-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 p-3 rounded-lg text-white font-semibold hover:bg-green-600 transition">
                    Get Started
                </button>
            </form>
        </div>
    )
}

export default SignIn;