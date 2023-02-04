import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const FDALabel = ({ totalItem, totalWeight }) => {
    const roundNumber = (num) => {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    };

    return (
        <Flex
            p={2}
            flexDirection="column"
            border="1px"
            shadow="xl"
            minW="350"
            maxW="350"
            minH="500"
        >
            <Heading fontWeight="bold">Nutrition Facts</Heading>
            <Divider />
            <Flex justify={"space-between"} mt={1}>
                <Text as="b" fontSize="xl">
                    Serving size
                </Text>
                <Text as="b" fontSize="xl">
                    100g
                </Text>
            </Flex>
            <hr
                style={{
                    color: "black",
                    backgroundColor: "black",
                    height: 13,
                }}
            />
            <Flex justify="space-between" mb={1}>
                <Flex flexDir={"column"}>
                    <Text as="b" fontSize="lg">
                        Amount Per Serving
                    </Text>

                    <Heading display="flex" fontSize="3xl">
                        Calories
                    </Heading>
                </Flex>
                <Heading alignSelf="end" fontSize="5xl">
                    {Math.round(
                        0.239006 *
                            roundNumber(
                                100 *
                                    (roundNumber(totalItem.enerc) / totalWeight)
                            )
                    )}
                </Heading>
            </Flex>
            <hr
                style={{
                    color: "black",
                    backgroundColor: "black",
                    height: 7,
                }}
            />
            <Flex justify="flex-end" mt={"0.5"}>
                <Text as="b">
                    % Daily Value <sup>*</sup>
                </Text>
            </Flex>
            <Divider />
            <Flex justify="space-between" mt={"0.5"}>
                <Flex>
                    <Text as="b">Total Fat</Text>
                    <Text ml={2}>
                        {Math.round(
                            100 * (roundNumber(totalItem.fatce) / totalWeight)
                        )}
                        g
                    </Text>
                </Flex>
                <Text as="b">
                    {Math.round(
                        (100 * (roundNumber(totalItem.fatce) / totalWeight)) /
                            0.8
                    )}
                    %
                </Text>
            </Flex>
            <Divider />
            <Flex justify="space-between" mt={"0.5"}>
                <Flex ml={5}>
                    <Text>Saturated Fat</Text>
                    <Text ml={2}>
                        {Math.round(
                            100 * (roundNumber(totalItem.fasat) / totalWeight)
                        )}
                        g
                    </Text>
                </Flex>
                <Text as="b">
                    {Math.round(
                        (100 * (roundNumber(totalItem.fasat) / totalWeight)) /
                            0.2
                    )}
                    %
                </Text>
            </Flex>
            <Divider />
            <Flex justify="space-between" mt={"0.5"} ml={5}>
                <Text>Trans Fat 0g</Text>
            </Flex>
            <Divider />
            <Flex justify="space-between" mt={"0.5"}>
                <Flex>
                    <Text as="b">Cholesterol</Text>
                    <Text ml={2}>
                        {Math.round(
                            100 *
                                (roundNumber(1000 * totalItem.cholc) /
                                    totalWeight)
                        )}
                        mg
                    </Text>
                </Flex>
                <Text as="b">
                    {Math.round(
                        (100 *
                            (roundNumber(1000 * totalItem.cholc) /
                                totalWeight)) /
                            3
                    )}
                    %
                </Text>
            </Flex>
            <Divider />
            <Flex justify="space-between" mt={"0.5"}>
                <Flex>
                    <Text as="b">Sodium</Text>
                    <Text ml={2}>
                        {Math.round(
                            100 *
                                (roundNumber(1000 * totalItem.na) / totalWeight)
                        )}
                        mg
                    </Text>
                </Flex>
                <Text as="b">
                    {Math.round(
                        (100 *
                            (roundNumber(1000 * totalItem.na) / totalWeight)) /
                            23
                    )}
                    %
                </Text>
            </Flex>
            <Divider />
            <Flex justify="space-between" mt={"0.5"}>
                <Flex>
                    <Text as="b">Total Carbohydrate</Text>
                    <Text ml={2}>
                        {Math.round(
                            100 *
                                (roundNumber(totalItem.choavldf) / totalWeight)
                        )}
                        g
                    </Text>
                </Flex>
                <Text as="b">
                    {Math.round(
                        (10000 *
                            (roundNumber(totalItem.choavldf) / totalWeight)) /
                            275
                    )}
                    %
                </Text>
            </Flex>
            <Divider />
            <Flex justify="space-between" mt={"0.5"}>
                <Flex ml={5}>
                    <Text>Dietary Fiber</Text>
                    <Text ml={2}>
                        {Math.round(
                            100 * (roundNumber(totalItem.fibtg) / totalWeight)
                        )}
                        g
                    </Text>
                </Flex>
                <Text as="b">
                    {Math.round(
                        (10000 * (roundNumber(totalItem.fibtg) / totalWeight)) /
                            28
                    )}
                    %
                </Text>
            </Flex>
            <Divider />
            <Flex justify="space-between" mt={"0.5"}>
                <Flex ml={5}>
                    <Text>Total Sugars</Text>
                    <Text ml={2}>
                        {Math.round(
                            100 *
                                (roundNumber(
                                    totalItem.starch +
                                        totalItem.frus +
                                        totalItem.glus +
                                        totalItem.sucs +
                                        totalItem.mals
                                ) /
                                    totalWeight)
                        )}
                        g
                    </Text>
                </Flex>
            </Flex>
            <Divider />
            <Flex justify="space-between" mt={"0.5"}>
                <Flex>
                    <Text as="b">Protein</Text>
                    <Text ml={2}>
                        {Math.round(
                            100 * (roundNumber(totalItem.protcnt) / totalWeight)
                        )}
                        g
                    </Text>
                </Flex>
            </Flex>
            <hr
                style={{
                    color: "black",
                    backgroundColor: "black",
                    height: 11,
                }}
            />
            <Flex justify="space-between" mt={"0.5"}>
                <Flex>
                    <Text as="b">Vitamin D</Text>
                    <Text ml={2}>
                        {Math.round(
                            100 *
                                (roundNumber(totalItem.chocal * 1000000) /
                                    totalWeight)
                        )}
                        mcg
                    </Text>
                </Flex>
                <Text as="b">
                    {Math.round(
                        (10000 *
                            (roundNumber(totalItem.chocal * 1000000) /
                                totalWeight)) /
                            20
                    )}
                    %
                </Text>
            </Flex>
            <Divider />
            <Flex justify="space-between" mt={"0.5"}>
                <Flex>
                    <Text as="b">Calcium</Text>
                    <Text ml={2}>
                        {Math.round(
                            100 *
                                (roundNumber(totalItem.ca * 1000) / totalWeight)
                        )}
                        mg
                    </Text>
                </Flex>
                <Text as="b">
                    {Math.round(
                        (10000 *
                            (roundNumber(totalItem.ca * 1000) / totalWeight)) /
                            1300
                    )}
                    %
                </Text>
            </Flex>
            <Divider />
            <Flex justify="space-between" mt={"0.5"}>
                <Flex>
                    <Text as="b">Iron</Text>
                    <Text ml={2}>
                        {Math.round(
                            100 *
                                (roundNumber(totalItem.fe * 1000) / totalWeight)
                        )}
                        mg
                    </Text>
                </Flex>
                <Text as="b">
                    {Math.round(
                        (10000 *
                            (roundNumber(totalItem.fe * 1000) / totalWeight)) /
                            18
                    )}
                    %
                </Text>
            </Flex>
            <Divider />
            <Flex justify="space-between" mt={"0.5"}>
                <Flex>
                    <Text as="b">Potassium</Text>
                    <Text ml={2}>
                        {Math.round(
                            100 *
                                (roundNumber(totalItem.k * 1000) / totalWeight)
                        )}
                        mg
                    </Text>
                </Flex>
                <Text as="b">
                    {Math.round(
                        (10000 *
                            (roundNumber(totalItem.k * 1000) / totalWeight)) /
                            4700
                    )}
                    %
                </Text>
            </Flex>
            <hr
                style={{
                    color: "black",
                    backgroundColor: "black",
                    height: 7,
                }}
            />
            <Text p={2} fontSize="sm" textAlign="justify">
                <sup>*</sup> The % Daily Value (DV) tells you how much a
                nutrient in a serving of food contributes to a daily diet. 2,000
                calories a day is used for general nutrition advice.
            </Text>
        </Flex>
    );
};

export default FDALabel;
