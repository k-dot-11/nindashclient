import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import AdditionalDetails from "./AdditionalDetails";

const RecipeCard = ({ recipe }) => {
    let { recipeName, quantities, items, totalItem } = recipe;

    const [detailsOpen, setDetailsOpen] = useState(false);

    const totalWeight = quantities.reduce((p, c) => p + c, 0);
    const roundNumber = (num) => {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    };

    return (
        <Flex
            shadow="xl"
            p={5}
            borderRadius="lg"
            flexDirection="column"
            w={["90vw", "80vw", "70vw", "60vw"]}
            m={4}
        >
            <Heading size="lg" mb={5}>
                {recipeName}
            </Heading>
            <SimpleGrid columns={[2, 2, 3, 4]} spacing={10}>
                <Stat>
                    <StatLabel>Energy (kJ)</StatLabel>
                    <StatNumber>
                        {roundNumber(
                            100 * (roundNumber(totalItem.enerc) / totalWeight)
                        )}
                    </StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Fat (g)</StatLabel>
                    <StatNumber>
                        {roundNumber(
                            100 * (roundNumber(totalItem.fatce) / totalWeight)
                        )}
                    </StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Carbohydrate (g)</StatLabel>
                    <StatNumber>
                        {roundNumber(
                            100 *
                                (roundNumber(totalItem.choavldf) / totalWeight)
                        )}
                    </StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Protein (g)</StatLabel>
                    <StatNumber>
                        {roundNumber(
                            100 * (roundNumber(totalItem.protcnt) / totalWeight)
                        )}
                    </StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Iron (mg)</StatLabel>
                    <StatNumber>
                        {roundNumber(
                            100 *
                                (roundNumber(totalItem.fe * 1000) / totalWeight)
                        )}
                    </StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Vit A(μg)</StatLabel>
                    <StatNumber>
                        {roundNumber(
                            100 *
                                (roundNumber(totalItem.vita * 1000000) /
                                    totalWeight)
                        )}
                    </StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Vit D3 (μg)</StatLabel>
                    <StatNumber>
                        {roundNumber(
                            100 *
                                (roundNumber(totalItem.chocal * 1000000) /
                                    totalWeight)
                        )}
                    </StatNumber>
                </Stat>
            </SimpleGrid>
            <Flex justify="end">
                <Button
                    m={3}
                    colorScheme="yellow"
                    variant="solid"
                    onClick={() => console.log(totalItem)}
                >
                    Clone Recipe
                </Button>
                <Button
                    m={3}
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => setDetailsOpen(true)}
                >
                    Show more
                </Button>
            </Flex>
            <Modal isOpen={detailsOpen} onClose={() => setDetailsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <AdditionalDetails
                            name={recipeName}
                            foodItem={totalItem}
                            quantity={100}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="ghost"
                            color="teal"
                            mr={3}
                            onClick={() => setDetailsOpen(false)}
                        >
                            Ok
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default RecipeCard;
