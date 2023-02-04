import {
    Button,
    Flex,
    IconButton,
    Input,
    Spinner,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FormControl } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import { ListItem, ListIcon, UnorderedList } from "@chakra-ui/react";
import {
    FaDownload,
    FaInfoCircle,
    FaPizzaSlice,
    FaTrashAlt,
} from "react-icons/fa";
import { CSVLink } from "react-csv";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import AdditionalDetails from "../components/AdditionalDetails";
import { foods, columns } from "../data/foods";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

export default function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [saveRecipeOpen, setSaveRecipeOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const [detailsItem, setDetailsItem] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [recipeName, setRecipeName] = useState("");
    const [itemSelected, setItemSelected] = useState("");

    const [totalWeight, setTotalWeight] = useState(0);
    const [quantity, setQuantity] = useState(100);

    const [items, setItems] = useState([]);
    const [quantities, setQuantities] = useState([]);

    const [ids, setIds] = useState([]);
    const [excelData, setExcelData] = useState([]);

    const [totalItem, setTotalItem] = useState(null);

    const router = useRouter();
    const toast = useToast();
    const db = getFirestore(app);

    const auth = getAuth();
    useEffect(() => {
        if (!router.query.currRecipe) {
            setPageLoading(false);
        } else getDataFromQuery();
    }, []);

    const getDataFromQuery = async () => {
        const snap = await getDoc(doc(db, "recipes", router.query.currRecipe));
        if (snap.exists()) {
            let data = snap.data();
            setItems(data.items);
            setQuantities(data.quantities);
            setTotalItem(data.totalItem);

            let newIds = [];
            data.items.forEach((item) => {
                newIds.push(item.code);
            });
            setIds(newIds);
            setTotalWeight(
                data.quantities.reduce(function (x, y) {
                    return x + y;
                }, 0)
            );
            setPageLoading(false);
        } else console.log("No such document");
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleRecipeInputChange = (e) => {
        setRecipeName(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const generateExcel = () => {
        const csvData = [
            [
                "Item Name",
                "QUANTITY (g)",
                "Fat (g)",
                "Energy (kJ)",
                "Protein (g)",
                "Carbohydrate (g)",
                "Iron (mg)",
                "Vit D3 (μg)",
                "Vit B1 (mg)",
                "Vit A (μg)",
                "Vit B2 (mg)",
                "Vit B3 (mg)",
                "Vit B5 (mg)",
                "Vit B6 (mg)",
                "Vit B7 (mg)",
                "Vit B9 (mg)",
                "Vit C (mg)",
                "Vit E (mg)",
                "Vit K (µg)",
                "Calcium (mg)",
                "Iron (mg)",
                "Magnesium (mg)",
                "Potassium (mg)",
                "Sodium (mg)",
                "Zinc (mg)",
                "Total Starch (g)",
                "Fructose (g)",
                "Glucose (g)",
                "Sucrose (g)",
                "Maltose (g)",
                "Total Saturated Fatty Acids (mg)",
                "Total Mono Unsaturated Fatty Acids (mg)",
                "Total Poly Unsaturated Fatty Acids (mg)",
            ],
        ];
        items.map((item, index) => {
            let newRow = [
                item.name,
                quantities[index],
                roundNumber(item.fatce * (quantities[index] / 100)),
                roundNumber(item.enerc * (quantities[index] / 100)),
                roundNumber(item.protcnt * (quantities[index] / 100)),
                roundNumber(item.choavldf * (quantities[index] / 100)),
                roundNumber(item.fe * 1000 * (quantities[index] / 100)),
                roundNumber(item.chocal * 1000000 * (quantities[index] / 100)),
                roundNumber(item.vita * 1000000 * (quantities[index] / 100)),
                roundNumber((quantities[index] / 100) * item.thia * 1000),
                roundNumber((quantities[index] / 100) * item.ribf * 1000),
                roundNumber((quantities[index] / 100) * item.nia * 1000),
                roundNumber((quantities[index] / 100) * item.pantac * 1000),
                roundNumber((quantities[index] / 100) * item.vitb6c * 1000),
                roundNumber(
                    (quantities[index] / 100) * item.biot * 1000 * 1000
                ),
                roundNumber(
                    (quantities[index] / 100) * item.folsum * 1000 * 1000
                ),
                roundNumber((quantities[index] / 100) * item.vitc * 1000),
                roundNumber((quantities[index] / 100) * item.vite * 1000),
                roundNumber(
                    (quantities[index] / 100) * item.vitk1 * 1000 * 1000
                ),
                roundNumber((quantities[index] / 100) * item.ca * 1000),
                roundNumber((quantities[index] / 100) * item.fe * 1000),
                roundNumber((quantities[index] / 100) * item.mg * 1000),
                roundNumber((quantities[index] / 100) * item.k * 1000),
                roundNumber((quantities[index] / 100) * item.na * 1000),
                roundNumber((quantities[index] / 100) * item.zn * 1000),
                roundNumber((quantities[index] / 100) * item.starch),
                roundNumber((quantities[index] / 100) * item.frus),
                roundNumber((quantities[index] / 100) * item.glus),
                roundNumber((quantities[index] / 100) * item.sucs),
                roundNumber((quantities[index] / 100) * item.mals),
                roundNumber((quantities[index] / 100) * item.fasat * 1000),
                roundNumber((quantities[index] / 100) * item.fams * 1000),
                roundNumber((quantities[index] / 100) * item.fapu * 1000),
            ];
            csvData = [...csvData, newRow];
        });

        let lastRow = [
            "Total",
            roundNumber(totalWeight),
            roundNumber(totalItem.fatce),
            roundNumber(totalItem.enerc),
            roundNumber(totalItem.protcnt),
            roundNumber(totalItem.choavldf),
            roundNumber(totalItem.fe),
            roundNumber(totalItem.chocal),
            roundNumber(totalItem.vita),
        ];

        csvData.push(lastRow);
        setExcelData(csvData);
    };

    const roundNumber = (num) => {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    };

    const saveRecipe = async () => {
        try {
            const docRef = await addDoc(collection(db, "recipes"), {
                recipeName,
                items,
                quantities,
                totalItem,
                email: auth.currentUser.email,
                username: auth.currentUser.displayName,
            });
            console.log("Document written with ID: ", docRef.id);
            toast({
                title: "Recipe saved !",
                description: "Recipe ID : " + docRef.id,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (e) {
            console.error("Error adding document: ", e);
            toast({
                title: "Error adding recipe",
                description: e,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setSaveRecipeOpen(false);
        }
    };

    let per100array = [
        totalItem
            ? roundNumber(100 * (roundNumber(totalItem.fatce) / totalWeight))
            : 0,
        totalItem
            ? roundNumber(100 * (roundNumber(totalItem.enerc) / totalWeight))
            : 0,
        totalItem
            ? roundNumber(100 * (roundNumber(totalItem.protcnt) / totalWeight))
            : 0,
        totalItem
            ? roundNumber(100 * (roundNumber(totalItem.choavldf) / totalWeight))
            : 0,
        totalItem
            ? roundNumber(
                  100 * (roundNumber(totalItem.fe * 1000) / totalWeight)
              )
            : 0,
        totalItem
            ? roundNumber(
                  100 * (roundNumber(totalItem.chocal * 1000000) / totalWeight)
              )
            : 0,
        totalItem
            ? roundNumber(
                  100 * (roundNumber(totalItem.vita * 1000000) / totalWeight)
              )
            : 0,
    ];

    const postData = (e, q) => {
        setLoading(true);
        if (searchInput.length > 0) {
            axios
                .post("https://nin-mid.onrender.com", {
                    name: e,
                })
                .then((res) => {
                    if (res.status == 200) {
                        let index = ids.indexOf(res.data.code);
                        if (index != -1) {
                            let newQuantities = [...quantities];
                            newQuantities[index] += q;
                            setQuantities(newQuantities);
                        } else {
                            setItems([...items, res.data]);
                            setQuantities([...quantities, q]);
                            setIds([...ids, res.data.code]);
                        }
                        if (!totalItem) {
                            let temp = { ...res.data };
                            for (var attrName in res.data) {
                                temp[attrName] = (q / 100) * res.data[attrName];
                            }
                            setTotalItem(temp);
                        } else {
                            let temp = { ...totalItem };
                            for (var attrName in res.data) {
                                temp[attrName] +=
                                    res.data[attrName] * (q / 100);
                            }
                            setTotalItem(temp);
                        }

                        setTotalWeight(totalWeight + q);
                    }
                    setLoading(false);
                });
        }
    };

    const deleteItem = (item, index) => {
        setTotalWeight(totalWeight - quantities[index]);
        console.log(quantities[index] / 100);
        let temp = { ...totalItem };
        for (var attrName in item)
            temp[attrName] -= (quantities[index] / 100) * item[attrName];
        setTotalItem(temp);

        let newItems = [...items];
        newItems.splice(index, 1);
        let newQuantities = [...quantities];
        newQuantities.splice(index, 1);
        let newIds = [...ids];
        newIds.splice(index, 1);
        setIds(newIds);
        setItems(newItems);
        setQuantities(newQuantities);
    };

    const displayToast = () => {
        toast({
            title: "User not logged in",
            description: "You need to sign in to save your recipe.",
            status: "info",
            duration: 5000,
            isClosable: true,
        });
    };

    return pageLoading ? (
        <Flex p={5} align={"center"} justify="center">
            <Spinner />
        </Flex>
    ) : (
        <Flex direction="column" align="center" m={2}>
            <TableContainer>
                <Table variant="striped">
                    <Thead>
                        <Tr>
                            {columns.map((column) => {
                                return (
                                    <Td
                                        key={column}
                                        textAlign="center"
                                        color="blackAlpha.600"
                                        fontSize="sm"
                                        isNumeric
                                        fontWeight="bold"
                                    >
                                        {column}
                                    </Td>
                                );
                            })}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {items.map((item, index) => {
                            let visible = true;
                            return (
                                visible && (
                                    <Tr
                                        key={item.code}
                                        visibility={
                                            visible ? "visible" : "hidden"
                                        }
                                        fontSize="sm"
                                        textAlign="center"
                                    >
                                        <Td textAlign="center">{item.name}</Td>
                                        <Td textAlign="center">
                                            {quantities[index]}{" "}
                                        </Td>
                                        <Td textAlign="center" isNumeric>
                                            {roundNumber(
                                                item.fatce *
                                                    (quantities[index] / 100)
                                            )}
                                        </Td>
                                        <Td textAlign="center" isNumeric>
                                            {roundNumber(
                                                item.enerc *
                                                    (quantities[index] / 100)
                                            )}
                                        </Td>
                                        <Td textAlign="center" isNumeric>
                                            {roundNumber(
                                                item.protcnt *
                                                    (quantities[index] / 100)
                                            )}
                                        </Td>
                                        <Td textAlign="center" isNumeric>
                                            {roundNumber(
                                                item.choavldf *
                                                    (quantities[index] / 100)
                                            )}
                                        </Td>
                                        <Td textAlign="center" isNumeric>
                                            {roundNumber(
                                                item.fe *
                                                    1000 *
                                                    (quantities[index] / 100)
                                            )}
                                        </Td>
                                        <Td textAlign="center" isNumeric>
                                            {roundNumber(
                                                item.chocal *
                                                    1000000 *
                                                    (quantities[index] / 100)
                                            )}
                                        </Td>
                                        <Td textAlign="center" isNumeric>
                                            {roundNumber(
                                                item.vita *
                                                    1000000 *
                                                    (quantities[index] / 100)
                                            )}
                                        </Td>
                                        <IconButton
                                            variant="ghost"
                                            color="teal"
                                            aria-label="Search database"
                                            icon={<FaInfoCircle />}
                                            onClick={() => {
                                                setDetailsItem(item);
                                                setDetailsOpen(true);
                                            }}
                                        />

                                        <IconButton
                                            variant="ghost"
                                            colorScheme="red"
                                            icon={<FaTrashAlt />}
                                            onClick={() => {
                                                deleteItem(item, index);
                                                visible = false;
                                            }}
                                        />
                                    </Tr>
                                )
                            );
                        })}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Total</Th>
                            <Th fontSize="sm" textAlign="center">
                                {totalItem ? roundNumber(totalWeight) : 0}
                            </Th>
                            <Th fontSize="sm" textAlign="center" isNumeric>
                                {totalItem ? roundNumber(totalItem.fatce) : 0}{" "}
                            </Th>
                            <Th fontSize="sm" textAlign="center" isNumeric>
                                {totalItem ? roundNumber(totalItem.enerc) : 0}
                            </Th>
                            <Th fontSize="sm" textAlign="center" isNumeric>
                                {totalItem ? roundNumber(totalItem.protcnt) : 0}
                            </Th>
                            <Th fontSize="sm" textAlign="center" isNumeric>
                                {totalItem
                                    ? roundNumber(totalItem.choavldf)
                                    : 0}
                            </Th>
                            <Th fontSize="sm" textAlign="center" isNumeric>
                                {totalItem
                                    ? roundNumber(totalItem.fe * 1000)
                                    : 0}
                            </Th>
                            <Th fontSize="sm" textAlign="center" isNumeric>
                                {totalItem
                                    ? roundNumber(totalItem.chocal * 1000000)
                                    : 0}
                            </Th>
                            <Th fontSize="sm" textAlign="center" isNumeric>
                                {totalItem
                                    ? roundNumber(totalItem.vita * 1000000)
                                    : 0}
                            </Th>
                        </Tr>
                        <Tr>
                            <Th>Per 100g</Th>

                            <Th fontSize="sm" textAlign="center">
                                {totalWeight ? 100 : 0}
                            </Th>
                            {per100array.map((entry) => {
                                return (
                                    <Th
                                        fontSize="sm"
                                        textAlign="center"
                                        isNumeric
                                    >
                                        {entry || 0}{" "}
                                    </Th>
                                );
                            })}
                        </Tr>
                    </Tfoot>
                    <TableCaption>
                        All data is collected from the official IFCT manual
                        published in 2017. <br/>Data for oils is collected from USDA Food Central.
                    </TableCaption>
                </Table>
            </TableContainer>

            {/* Input for search */}
            <FormControl align="center" mt="2">
                <Flex justify="center" w="50vw">
                    {loading ? (
                        <Spinner />
                    ) : (
                        <Input
                            placeholder="Enter food ingreidient"
                            autoComplete="off"
                            autoFocus
                            variant="filled"
                            value={searchInput}
                            onChange={handleInputChange}
                        />
                    )}
                </Flex>
            </FormControl>

            {/* Search results */}
            <UnorderedList mt={5}>
                {searchInput.length > 0 &&
                    foods
                        .filter(
                            (item) =>
                                item
                                    .toLowerCase()
                                    .includes(searchInput.toLowerCase()) ||
                                item
                                    .toLowerCase()
                                    .startsWith(searchInput.toLowerCase())
                        )
                        .map((item) => {
                            return (
                                <Flex
                                    p={5}
                                    align="center"
                                    justify="space-between"
                                    listStyleType="none"
                                    key={item}
                                >
                                    <ListItem
                                        key={item}
                                        fontSize="lg"
                                        id={item}
                                    >
                                        <ListIcon
                                            mr={6}
                                            as={FaPizzaSlice}
                                            color="green.500"
                                        />
                                        {item}
                                    </ListItem>
                                    <Button
                                        colorScheme="teal"
                                        variant="ghost"
                                        ml="4"
                                        onClick={() => {
                                            setItemSelected(item);
                                            onOpen();
                                        }}
                                    >
                                        +
                                    </Button>
                                </Flex>
                            );
                        })}
            </UnorderedList>

            {items.length > 0 && (
                <Flex flexDirection="column">
                    <Flex>
                        <Button
                            variant="outline"
                            colorScheme={"teal"}
                            onClick={() => {
                                totalItem.name = "TOTAL";
                                setDetailsItem(totalItem);
                                setDetailsOpen(true);
                            }}
                            mr={3}
                        >
                            Show more data
                        </Button>

                        <Button
                            variant="outline"
                            colorScheme={"teal"}
                            onClick={generateExcel}
                            mr={3}
                        >
                            Generate Excel
                        </Button>

                        {excelData.length > 0 && (
                            <Button
                                rightIcon={<FaDownload />}
                                variant={"solid"}
                                ml={3}
                                colorScheme="teal"
                            >
                                <CSVLink data={excelData}>Download me</CSVLink>
                            </Button>
                        )}
                    </Flex>
                    <Button
                        variant="solid"
                        colorScheme={"yellow"}
                        onClick={
                            auth.currentUser
                                ? () => setSaveRecipeOpen(true)
                                : displayToast
                        }
                        mt={5}
                    >
                        Save recipe
                    </Button>
                </Flex>
            )}

            {/* Quantity entry */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Enter Quantity (g)</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="ghost"
                            color="red"
                            mr={3}
                            onClick={onClose}
                        >
                            Close
                        </Button>
                        <Button
                            variant="solid"
                            colorScheme="teal"
                            onClick={() => {
                                setSearchInput("");
                                postData(itemSelected, parseInt(quantity));
                                setQuantity(100);
                                onClose();
                            }}
                        >
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/* Details Modal */}
            <Modal isOpen={detailsOpen} onClose={() => setDetailsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <AdditionalDetails
                            foodItem={detailsItem}
                            quantity={
                                detailsItem == totalItem
                                    ? 100
                                    : quantities[items.indexOf(detailsItem)]
                            }
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
            {/* Save recipe Modal */}
            <Modal
                isOpen={saveRecipeOpen}
                onClose={() => setSaveRecipeOpen(false)}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Enter recipe name</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl align="center" mt="2">
                            <Input
                                autoComplete="off"
                                autoFocus
                                variant="filled"
                                value={recipeName}
                                onChange={handleRecipeInputChange}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="ghost"
                            colorScheme="yellow"
                            mr={3}
                            onClick={saveRecipe}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}
