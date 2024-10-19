const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-[#030303] text-white min-h-screen flex">
            <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                <main className="max-w-md w-full">{children}</main>
            </div>

            <div className="hidden md:block md:w-1/2 h-[50%]">
                <img
                    src="signInImg.jpg"
                    alt="doctor image"
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    );
};

export default Layout;
