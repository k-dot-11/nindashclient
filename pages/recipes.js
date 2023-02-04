import { Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { app } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Head from "next/head";
import RecipeCard from "../components/RecipeCard";

const recipes = ({ auth }) => {
    const [recipes, setRecipes] = useState([]);
    const [ids, setIDs] = useState([]);
    const [loading, setLoading] = useState(true);
    const db = getFirestore(app);

    useEffect(() => {
        async function getData() {
            const querySnapshot = await getDocs(collection(db, "recipes"));
            let newRecipes = [];
            let newIds = [];
            querySnapshot.forEach((doc) => {
                newRecipes.push(doc.data());
                newIds.push(doc.id);
            });
            setIDs(newIds);
            setRecipes(newRecipes);
            setLoading(false);
            console.log(auth);
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
                {recipes.map((r, i) => {
                    return (
                        <RecipeCard
                            recipe={r}
                            key={ids[i]}
                            id={ids[i]}
                            auth={auth}
                            db={db}
                        />
                    );
                })}
            </Flex>
        </Flex>
    );
};

export default recipes;
