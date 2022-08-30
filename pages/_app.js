import { ChakraProvider, Flex, Text } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Flex h="50" bg="teal" align="center" justify='center'>
				<Text color="white" fontWeight="bold">
					Nutritional Calculator
				</Text>
			</Flex>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
