import { ChakraProvider, Flex, Link as CLink, Button } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [isSignedIn, setIsSignedIn] = useState(false);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsSignedIn(true);
        } else {
            setIsSignedIn(false);
        }
    });

    const handleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
            });
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setIsSignedIn(false);
            })
            .catch((error) => {
                console.log("Error : " + error);
            });
    };

    return (
        <ChakraProvider>
            <Head>
                <title>NIN Dashboard</title>
            </Head>
            <Flex
                px={8}
                h="50"
                bg="teal"
                align="center"
                justify={[
                    "space-between",
                    "space-between",
                    "space-around",
                    "space-around",
                ]}
            >
                <Flex>
                    <Link href="/">
                        <CLink
                            style={{ textDecoration: "none" }}
                            color="white"
                            fontWeight="bold"
                        >
                            Nutritional Calculator
                        </CLink>
                    </Link>
                </Flex>
                <Flex>
                    <Flex
                        align={"center"}
                        display={["none", "none", "block", "block"]}
                    >
                        <Link href="/">
                            <CLink
                                mr={4}
                                style={{ textDecoration: "none" }}
                                color="white"
                                fontWeight="bold"
                            >
                                Home
                            </CLink>
                        </Link>
                        <Link href="/recipes">
                            <CLink
                                ml={4}
                                style={{ textDecoration: "none" }}
                                color="white"
                                fontWeight="bold"
                            >
                                Recipes
                            </CLink>
                        </Link>
                        <Button
                            ml={3}
                            variant="text"
                            color="white"
                            onClick={isSignedIn ? handleSignOut : handleSignIn}
                        >
                            {isSignedIn ? "Sign out" : "Sign in"}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
            <Component {...pageProps} auth={auth} />
        </ChakraProvider>
    );
}

export default MyApp;
