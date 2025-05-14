import {signIn} from "next-auth/react";

export default function useLogIn() {
    return signIn();
}