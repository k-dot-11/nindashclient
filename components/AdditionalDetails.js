import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const AdditionalDetails = (props) => {
    let { quantity, foodItem } = props;

    const roundNumber = (num) => {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    };

    const VitaminTable = () => {
        return (
            <Flex direction="column">
                <Text>
                    Vitamin B1 :{" "}
                    {roundNumber((quantity / 100) * foodItem.thia * 1000)} mg
                </Text>
                <Text>
                    Vitamin B2 :{" "}
                    {roundNumber((quantity / 100) * foodItem.ribf * 1000)} mg
                </Text>
                <Text>
                    Vitamin B3 :{" "}
                    {roundNumber((quantity / 100) * foodItem.nia * 1000)} mg
                </Text>
                <Text>
                    Vitamin B5 :{" "}
                    {roundNumber((quantity / 100) * foodItem.pantac * 1000)} mg
                </Text>
                <Text>
                    Vitamin B6 :{" "}
                    {roundNumber((quantity / 100) * foodItem.vitb6c * 1000)} mg
                </Text>
                <Text>
                    Vitamin B7 :{" "}
                    {roundNumber(
                        (quantity / 100) * foodItem.biot * 1000 * 1000
                    )}{" "}
                    µg
                </Text>
                <Text>
                    Vitamin B9 :{" "}
                    {roundNumber(
                        (quantity / 100) * foodItem.folsum * 1000 * 1000
                    )}{" "}
                    µg
                </Text>
                <Text>
                    Vitamin C :{" "}
                    {roundNumber((quantity / 100) * foodItem.vitc * 1000)} mg
                </Text>
                <Text>
                    Vitamin E :{" "}
                    {roundNumber((quantity / 100) * foodItem.vite * 1000)} mg
                </Text>
                <Text>
                    Vitamin K :{" "}
                    {roundNumber(
                        (quantity / 100) * foodItem.vitk1 * 1000 * 1000
                    )}{" "}
                    µg
                </Text>
            </Flex>
        );
    };

    const MineralTable = () => {
        return (
            <Flex direction="column">
                <Text>
                    Calcium :{" "}
                    {roundNumber((quantity / 100) * foodItem.ca * 1000)} mg
                </Text>
                <Text>
                    Iron : {roundNumber((quantity / 100) * foodItem.fe * 1000)}{" "}
                    mg
                </Text>
                <Text>
                    Magnesium :{" "}
                    {roundNumber((quantity / 100) * foodItem.mg * 1000)} mg
                </Text>
                <Text>
                    Potassium :{" "}
                    {roundNumber((quantity / 100) * foodItem.k * 1000)} mg
                </Text>
                <Text>
                    Sodium :{" "}
                    {roundNumber((quantity / 100) * foodItem.na * 1000)} mg
                </Text>
                <Text>
                    Zinc : {roundNumber((quantity / 100) * foodItem.zn * 1000)}{" "}
                    mg
                </Text>
            </Flex>
        );
    };

    const FatTable = () => {
        return (
            <Flex direction="column">
                <Text>
                    Total Saturated Fatty Acids :{" "}
                    {roundNumber((quantity / 100) * foodItem.fasat * 1000)} mg
                </Text>
                <Text>
                    Total Mono Unsaturated Fatty Acids :{" "}
                    {roundNumber((quantity / 100) * foodItem.fams * 1000)} mg
                </Text>
                <Text>
                    Total Poly Unsaturated Fatty Acids :{" "}
                    {roundNumber((quantity / 100) * foodItem.fapu * 1000)} mg
                </Text>
            </Flex>
        );
    };

    const SugarsTable = () => {
        return (
            <Flex direction="column">
                <Text>
                    Total Starch :{" "}
                    {roundNumber((quantity / 100) * foodItem.starch)} g
                </Text>
                <Text>
                    Fructose : {roundNumber((quantity / 100) * foodItem.frus)} g
                </Text>
                <Text>
                    Glucose : {roundNumber((quantity / 100) * foodItem.glus)} g
                </Text>
                <Text>
                    Sucrose : {roundNumber((quantity / 100) * foodItem.sucs)} g
                </Text>
                <Text>
                    Maltose : {roundNumber((quantity / 100) * foodItem.mals)} g
                </Text>
            </Flex>
        );
    };

    return (
        <Flex direction="column">
            {!props.name && foodItem.name != "TOTAL" && <Text>{foodItem.name}</Text>}
            {props.name && <Text>{props.name}</Text>}
            {foodItem.name != "TOTAL" && <Text>Quantity : {quantity} g</Text>}
            <Tabs>
                <TabList>
                    <Tab>Vitamins</Tab>
                    <Tab>Minerals</Tab>
                    <Tab>Sugars</Tab>
                    <Tab>Fats</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <VitaminTable />
                    </TabPanel>
                    <TabPanel>
                        <MineralTable />
                    </TabPanel>
                    <TabPanel>
                        <SugarsTable />
                    </TabPanel>
                    <TabPanel>
                        <FatTable />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    );
};

export default AdditionalDetails;
