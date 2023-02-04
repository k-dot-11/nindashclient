import { HStack, Tag } from "@chakra-ui/react";
import React from "react";

const AllergenStack = ({ allergens }) => {
    let allergenTypes = [
        "Milk",
        "Egg",
        "Fish",
        "Shellfish",
        "Tree Nuts",
        "Peanuts",
        "Wheat",
        "Soybeans",
    ];
    let colorCodes = [
        "gray.100",
        "navajowhite",
        "red.100",
        "red.100",
        "green.100",
        "burlywood",
        "gray.100",
        "yellow.200",
    ];
    return (
        <HStack spacing={4} >
            {allergens.map((allergen, index) => {
                if (allergen)
                    return (
                        <Tag bgColor={colorCodes[index]}>
                            {allergenTypes[index]}
                        </Tag>
                    );
            })}
        </HStack>
    );
};

export default AllergenStack;
