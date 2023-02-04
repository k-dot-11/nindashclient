import { Button, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
import Router from "next/router";
import { deleteDoc, doc } from "firebase/firestore";
import { Avatar } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import AllergenStack from "./AllergenStack";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { FaArrowDown } from "react-icons/fa";
import FDALabel from "./FDALabel";

const RecipeCard = ({ recipe, id, auth, db }) => {
    let { recipeName, quantities, totalItem, email, username, items } = recipe;

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [labelOpen, setLabelOpen] = useState(false);
    const [allergens, setAllergens] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ]);

    const totalWeight = quantities.reduce((p, c) => p + c, 0);

    const roundNumber = (num) => {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    };

    const handleCloneClick = () => {
        Router.push({
            pathname: "/",
            query: {
                currRecipe: id,
            },
        });
    };

    const handleDeleteRecipe = async () => {
        await deleteDoc(doc(db, "recipes", id));
    };

    useEffect(() => {
        let arr = [false, false, false, false, false, false, false, false];
        items.map((item) => {
            if (item.grup == "Milk and Milk Products") arr[0] = true;
            else if (item.grup == "Egg and Egg Products") arr[1] = true;
            else if (
                item.grup == "Marine Fish" ||
                item.grup == "Fresh Water Fish and Shellfish"
            )
                arr[2] = true;
            else if (
                item.grup == "Marine Shellfish" ||
                item.grup == "Marine Mollusks"
            )
                arr[3] = true;
            if (
                item.name == "Almond" ||
                item.name == "Cashew nut" ||
                item.name == "Pistachio nuts" ||
                item.name == "Walnut"
            )
                arr[4] = true;
            else if (item.name == "Ground nut" || item.name == "Groundnut oil")
                arr[5] = true;
            else if (item.name.includes("Wheat")) arr[6] = true;
            else if (item.name.includes("Soya")) arr[7] = true;
        });
        setAllergens(arr);
    }, []);

    return (
        <Flex
            shadow="xl"
            p={5}
            borderRadius="lg"
            flexDirection="column"
            w={["90vw", "80vw", "70vw", "60vw"]}
            m={4}
        >
            <Flex
                justify="space-between"
                flexDirection={["column", "column", "row", "row"]}
            >
                <Heading size="lg" mb={5}>
                    {recipeName}
                </Heading>
                <Flex align={"center"} >
                    <Avatar
                        name={username}
                        size="sm"
                        src="https://bit.ly/broken-link"
                        mr={3}
                    />
                    {username}
                </Flex>
            </Flex>
            <Divider />
            <SimpleGrid columns={[2, 2, 3, 4]} mt={5} spacing={10}>
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
            <Flex
                justify={["center", "center", "space-between", "space-between"]}
                mt={3}
            >
                <Flex display={["none", "none", "flex", "flex"]} >
                    <AllergenStack allergens={allergens} />
                </Flex>
                <Flex
                    align="center"
                    flexDirection={["column", "column", "row", "row"]}
                >
                    {auth.currentUser && auth.currentUser.email == email && (
                        <Button
                            m={3}
                            colorScheme="red"
                            variant="solid"
                            onClick={handleDeleteRecipe}
                        >
                            Delete Recipe
                        </Button>
                    )}
                    <Button
                        m={3}
                        colorScheme="yellow"
                        variant="solid"
                        onClick={handleCloneClick}
                    >
                        Clone Recipe
                    </Button>
                    <Menu>
                        <MenuButton
                            m={3}
                            bgColor="teal.100"
                            as={Button}
                            rightIcon={<FaArrowDown />}
                        >
                            More Info
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => setDetailsOpen(true)}>
                                Other Nutrients
                            </MenuItem>
                            <MenuItem onClick={() => setLabelOpen(true)}>
                                Show nutrition label
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
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
            <Modal isOpen={labelOpen} onClose={() => setLabelOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Nutrition Label</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody align="center">
                        <FDALabel
                            totalItem={totalItem}
                            totalWeight={totalWeight}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="ghost"
                            color="teal"
                            mr={3}
                            onClick={() => setLabelOpen(false)}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default RecipeCard;
