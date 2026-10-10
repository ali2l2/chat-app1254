import ImageKit from "@imagekit/nodejs";
import { config } from "dotenv";
config();
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});
export default imagekit;