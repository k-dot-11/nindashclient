import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { app } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Head from "next/head";
import RecipeCard from "../components/RecipeCard";

const recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const db = getFirestore(app);

    useEffect(() => {
        async function getData() {
            const querySnapshot = await getDocs(collection(db, "recipes"));
            let newRecipes = [];
            querySnapshot.forEach((doc) => {
                newRecipes.push(doc.data());
            });
            setRecipes(newRecipes);
            setLoading(false);
        }
        if (recipes.length == 0) getData();
    }, [recipes]);

    return (
        <Flex justify="center" p={4}>
            <Head>
                <title>Recipes</title>
            </Head>
            <Flex flexDirection="column">
                {loading && <Spinner />}
                {recipes.map((r) => {
                    return <RecipeCard recipe={r} />;
                })}
            </Flex>
        </Flex>
    );
};

export default recipes;
