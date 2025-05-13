import loader from "@/assets/loader.gif";
import Image from "next/image";

const loading = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
            }}
        >
            <Image src={loader} alt="loading..." width={50}/>
        </div>
    );
};

export default loading;
