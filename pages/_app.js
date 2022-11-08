import { ChakraProvider, Flex, Text, Link as CLink } from "@chakra-ui/react";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <Flex
                px={8}
                h="50"
                bg="teal"
                align="center"
                justify="space-between"
            >
                <Link href="/">
                    <CLink
                        style={{ textDecoration: "none" }}
                        color="white"
                        fontWeight="bold"
                    >
                        Nutritional Calculator
                    </CLink>
                </Link>
                <Flex>
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
                </Flex>
            </Flex>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
