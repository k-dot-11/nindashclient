import { Button, Flex, IconButton, Input, Text, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { FormControl} from '@chakra-ui/react';
import { useState } from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import { ListItem, ListIcon,  UnorderedList } from '@chakra-ui/react';
import { FaInfoCircle, FaPizzaSlice } from 'react-icons/fa';

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton
} from '@chakra-ui/react';

export default function Home() {
	let foods = [
		'Milk, whole, Buffalo',
		'Milk, whole, Cow',
		'Paneer',
		'Khoa',
		'Toddy',
		'Coconut Water',
		'Button mushroom, fresh',
		'Chicken mushroom, fresh',
		'Shiitake mushroom, fresh',
		'Oyster mushroom, dried',
		'Jaggery, cane',
		'Sugarcane, juice',
		'Amaranth seed, black',
		'Amaranth seed, pale brown',
		'Bajra',
		'Barley',
		'Jowar',
		'Maize, dry',
		'Maize, tender, local',
		'Maize, tender, sweet',
		'Quinoa',
		'Ragi',
		'Rice flakes',
		'Rice puffed',
		'Rice, raw, brown',
		'Rice, parboiled, milled',
		'Rice, raw, milled',
		'Samai',
		'Varagu',
		'Wheat flour, refined',
		'Wheat flour, atta',
		'Wheat, whole',
		'Wheat, bulgur',
		'Wheat, semolina',
		'Wheat, vermicelli',
		'Wheat, vermicelli, roasted',
		'Bengal gram, dal',
		'Bengal gram, whole',
		'Black gram, dal',
		'Black gram, whole',
		'Cowpea, brown',
		'Cowpea, white',
		'Field bean, black',
		'Field bean, brown',
		'Field bean, white',
		'Green gram, dal',
		'Green gram, whole',
		'Horse gram, whole',
		'Lentil dal',
		'Lentil whole, brown',
		'Lentil whole, yellowish',
		'Moth bean',
		'Peas, dry',
		'Rajmah, black',
		'Rajmah, brown',
		'Rajmah, red',
		'Red gram, dal',
		'Red gram, whole',
		'Ricebean',
		'Soya bean, brown',
		'Soya bean, white',
		'Agathi leaves',
		'Amaranth leaves, green',
		'Amaranth leaves, red mix',
		'Amaranth leaves, red and green mix',
		'Amaranth spinosus, leaves, green mix',
		'Amaranth spinosus, leaves, red and green mix',
		'Basella leaves',
		'Bathua leaves',
		'Beet greens',
		'Betel leaves, big (kolkata)',
		'Betel leaves, small',
		'Brussels sprouts',
		'Cabbage, Chinese',
		'Cabbage, collard greens',
		'Cabbage, green',
		'Cabbage, violet',
		'Cauliflower leaves',
		'Colocasia leaves, green',
		'Drumstick leaves',
		'Fenugreek leaves',
		'Garden cress',
		'Gogu leaves, green',
		'Gogu leaves, red',
		'Knol-Khol, leaves',
		'Lettuce',
		'Mustard leaves',
		'Pak Choi leaves',
		'Parsley',
		'Ponnaganni',
		'Pumpkin leaves, tender',
		'Radish leaves',
		'Rumex leaves',
		'Spinach',
		'Tamarind leaves, tender',
		'Ash gourd',
		'Bamboo shoot, tender',
		'Bean scarlet, tender',
		'Bitter gourd, jagged, teeth ridges, elongate',
		'Bitter gourd, jagged, teeth ridges, short',
		'Bitter gourd, jagged, smooth ridges, elongate',
		'Bottle gourd, elongate, pale green',
		'Bottle gourd, round, pale green',
		'Bottle gourd, elongate, dark green',
		'Brinjal-1',
		'Brinjal-2',
		'Brinjal-3',
		'Brinjal-4',
		'Brinjal-5',
		'Brinjal-6',
		'Brinjal-7',
		'Brinjal-8',
		'Brinjal-9',
		'Brinjal-10',
		'Brinjal-11',
		'Brinjal-12',
		'Brinjal-13',
		'Brinjal-14',
		'Brinjal-15',
		'Brinjal-16',
		'Brinjal-17',
		'Brinjal-18',
		'Brinjal-19',
		'Brinjal-20',
		'Brinjal-21',
		'Brinjal - all varieties',
		'Broad beans',
		'Capsicum, green',
		'Capsicum, red',
		'Capsicum, yellow',
		'Cauliflower',
		'Celery stalk',
		'Cho-cho-marrow',
		'Cluster beans',
		'Colocasia, stem, black',
		'Colocasia, stem, green',
		'Corn, Baby',
		'Cucumber, green, elongate',
		'Cucumber, green, short',
		'Cucumber, orange, round',
		'Drumstick',
		'Field beans, tender, broad',
		'Field beans, tender, lean',
		'French beans, country',
		'French beans, hybrid',
		'Jack fruit, raw',
		'Jack fruit, seed, mature',
		'Knol - Khol',
		'Kovai, big',
		'Kovai, small',
		'Ladies finger',
		'Mango, green, raw',
		'Onion, stalk',
		'Papaya, raw',
		'Parwar',
		'Peas, fresh',
		'Plantain, flower',
		'Plantain, green',
		'Plantain, stem',
		'Pumpkin, green, cylindrical',
		'Pumpkin, orange, round',
		'Red gram, tender, fresh',
		'Ridge gourd',
		'Ridge gourd, smooth skin',
		'Snake gourd, long, pale green',
		'Snake gourd, long, dark green',
		'Snake gourd, short',
		'Tinda, tender',
		'Tomato, green',
		'Tomato, ripe, hybrid',
		'Tomato, ripe, local',
		'Zucchini, green',
		'Zucchini, yellow',
		'Apple, big',
		'Apple, green',
		'Apple, small',
		'Apple, small, Kashmir',
		'Apricot, dried',
		'Apricot, processed',
		'Avocado fruit',
		'Bael fruit',
		'Banana, ripe, montham',
		'Banana, ripe, poovam',
		'Banana, ripe, red',
		'Banana, ripe, robusta',
		'Black berry',
		'Cherries, red',
		'Currants, black',
		'Custard apple',
		'Dates, dry, pale brown',
		'Dates, dry, dark brown',
		'Dates, processed',
		'Fig',
		'Goosberry',
		'Grapes, seeded, round, black',
		'Grapes, seeded, round, green',
		'Grapes, seeded, round, red',
		'Grapes, seedless, oval, black',
		'Grapes, seedless, round, green',
		'Grapes, seedless, round, black',
		'Guava, white flesh',
		'Guava, pink flesh',
		'Jack fruit, ripe',
		'Jambu fruit, ripe',
		'Karonda fruit',
		'Lemon, juice',
		'Lime, sweet, pulp',
		'Litchi',
		'Mango, ripe, banganapalli',
		'Mango, ripe, gulabkhas',
		'Mango, ripe, himsagar',
		'Mango, ripe, kesar',
		'Mango, ripe, neelam',
		'Mango, ripe, paheri',
		'Mango, ripe, totapari',
		'Mangosteen',
		'Manila tamarind',
		'Musk melon, orange flesh',
		'Musk melon, yellow flesh',
		'Orange, pulp',
		'Palm fruit, tender',
		'Papaya, ripe',
		'Peach',
		'Pear',
		'Phalsa',
		'Pineapple',
		'Plum',
		'Pomegranate, maroon seeds',
		'Pummelo',
		'Raisins, dried, black',
		'Raisins, dried, golden',
		'Rambutan',
		'Sapota',
		'Soursop',
		'Star fruit',
		'Strawberry',
		'Tamarind, pulp',
		'Water melon, dark green (sugar baby)',
		'Water melon, pale green',
		'Wood Apple',
		'Zizyphus',

		'Beet root',
		'Carrot, orange',
		'Carrot, red',
		'Colocasia',
		'Lotus root',
		'Potato, brown skin, big',
		'Potato, brown skin, small',
		'Potato, red skin',
		'Radish, elongate, red skin',
		'Radish, elongate, white skin',
		'Radish, round, red skin',
		'Radish, round, white skin',
		'Sweet potato, brown skin',
		'Sweet potato, pink skin',
		'Tapioca',
		'Water Chestnut',
		'Yam, elephant',
		'Yam, ordinary',
		'Yam, wild',
		'Chillies, green-1',
		'Chillies, green-2',
		'Chillies, green-3',
		'Chillies, green-4',
		'Chillies, green-5',
		'Chillies, green-6',
		'Chillies, green-7',
		'Chillies, green - all varieties',
		'Coriander leaves',
		'Curry leaves',
		'Garlic, big clove',
		'Garlic, small clove',
		'Garlic, single clove, Kashmir',
		'Ginger, fresh',
		'Mango ginger',
		'Mint leaves',
		'Onion, big',
		'Onion, small',
		'Asafoetida',
		'Cardamom, green',
		'Cardamom, black',
		'Chillies, red',
		'Cloves',
		'Coriander seeds',
		'Cumin seeds',
		'Fenugreek seeds',
		'Mace',
		'Nutmeg',
		'Omum',
		'Pippali',
		'Pepper, black',
		'Poppy seeds',
		'Turmeric powder',
		'Almond',
		'Arecanut, dried, brown',
		'Arecanut, dried, red color',
		'Arecanut, fresh',
		'Cashew nut',
		'Coconut, kernal, dry',
		'Coconut, kernel, fresh',
		'Garden cress, seeds',
		'Gingelly seeds, black',
		'Gingelly seeds, brown',
		'Gingelly seeds, white',
		'Ground nut',
		'Mustard seeds',
		'Linseeds',
		'Niger seeds, black',
		'Niger seeds, gray',
		'Pine seed',
		'Pistachio nuts',
		'Safflower seeds',
		'Sunflower seeds',
		'Walnut',
		'Chicken, poultry, leg, skinless ',
		'Chicken, poultry, thigh, skinless ',
		'Chicken, poultry, breast, skinless ',
		'Chicken, poultry, wing, skinless ',
		'Egg, poultry, whole, raw ',
		'Egg, poultry, white, raw ',
		'Egg, poultry, yolk, raw ',
		'Egg, poultry, whole, boiled ',
		'Egg, poultry, white, boiled ',
		'Egg, poultry, yolk, boiled ',
		'Egg, poultry, omlet ',
		'Egg, country hen, whole, raw ',
		'Egg, country hen, whole, boiled ',
		'Egg, country hen, omlet ',
		'Egg, duck, whole, boiled ',
		'Egg, duck, whole, raw ',
		'Egg, duck, whole, omlet ',
		'Egg, quial, whole, raw ',
		'Egg, quial, whole, boiled ',
		'Goat, shoulder, meat ',
		'Goat, chops ',
		'Goat, legs ',
		'Goat, brain ',
		'Goat, tongue ',
		'Goat, lungs ',
		'Goat, heart ',
		'Goat, liver ',
		'Goat, tripe ',
		'Goat, spleen ',
		'Goat, kidneys ',
		'Goat, tube (small intestine) ',
		'Goat, testis ',
		'Sheep, shoulder ',
		'Sheep, chops ',
		'Sheep, leg ',
		'Sheep, brain ',
		'Sheep, tongue ',
		'Sheep, lungs ',
		'Sheep, heart ',
		'Sheep, liver ',
		'Sheep, tripe ',
		'Sheep, spleen ',
		'Sheep, kidneys ',
		'Beef, shoulder ',
		'Beef, chops ',
		'Beef, round (leg) ',
		'Beef, brain ',
		'Beef, tongue ',
		'Beef, lungs ',
		'Beef, heart ',
		'Beef, liver ',
		'Beef, tripe ',
		'Beef, spleen ',
		'Beef, kidneys ',
		'Calf, shoulder ',
		'Calf, chops ',
		'Calf, round (leg) ',
		'Calf, brain ',
		'Calf, tongue ',
		'Calf, heart ',
		'Calf, liver ',
		'Calf, spleen ',
		'Calf, kidneys ',
		'Mithun, shoulder ',
		'Mithun, chops ',
		'Mithun, round (leg) ',
		'Pork, shoulder ',
		'Pork, chops ',
		'Pork, ham ',
		'Pork, lungs ',
		'Pork, heart ',
		'Pork, liver ',
		'Pork, stomach ',
		'Pork, spleen ',
		'Pork, kidneys ',
		'Pork, tube (small intestine) ',
		'Hare, shoulder ',
		'Hare, chops ',
		'Hare, leg ',
		'Rabbit, shoulder ',
		'Rabbit, chops ',
		'Rabbit, leg ',
		'Allathi ',
		'Aluva ',
		'Anchovy ',
		'Ari fish ',
		'Betki ',
		'Black snapper ',
		'Bombay duck ',
		'Bommuralu ',
		'Cat fish',
		'Chakla ',
		'Chappal ',
		'Chelu ',
		'Chembali ',
		'Eri meen ',
		'Gobro ',
		'Guitar fish ',
		'Hilsa ',
		'Jallal ',
		'Jathi vela meen ',
		'Kadal bral ',
		'Kadali ',
		'Kalamaara ',
		'Kalava ',
		'Kanamayya ',
		'Kannadi paarai ',
		'Karimeen ',
		'Karnagawala ',
		'Kayrai ',
		'Kiriyan ',
		'Kite fish ',
		'Korka ',
		'Kulam paarai ',
		'Maagaa ',
		'Mackerel ',
		'Manda clathi ',
		'Matha ',
		'Milk fish ',
		'Moon fish ',
		'Mullet ',
		'Mural ',
		'Myil meen ',
		'Nalla bontha ',
		'Narba ',
		'Paarai ',
		'Padayappa ',
		'Pali kora ',
		'Pambada ',
		'Pandukopa ',
		'Parava ',
		'Parcus ',
		'Parrot fish ',
		'Perinkilichai ',
		'Phopat ',
		'Piranha ',
		'Pomfret, black ',
		'Pomfret, snub nose ',
		'Pomfret, white ',
		'Pranel ',
		'Pulli paarai ',
		'Queen fish ',
		'Raai fish ',
		'Raai vanthu ',
		'Rani ',
		'Ray fish, bow head, spotted ',
		'Red snapper ',
		'Red snapper, small ',
		'Sadaya ',
		'Salmon ',
		'Sangada ',
		'Sankata paarai ',
		'Sardine ',
		'Shark ',
		'Shark, hammer head ',
		'Shark, spotted ',
		'Shelavu ',
		'Silan ',
		'Silk fish ',
		'Silver carp ',
		'Sole fish ',
		'Stingray ',
		'Tarlava ',
		'Tholam ',
		'Tilapia ',
		'Tuna ',
		'Tuna, striped ',
		'Valava ',
		'Vanjaram ',
		'Vela meen ',
		'Vora ',
		'Whale shark ',
		'Xiphinis ',
		'Eggs, Cat fish',
		'Crab, sea',
		'Lobster, brown ',
		'Lobster, king size ',
		'Mud crab',
		'Oyster ',
		'Tiger prawns, brown ',
		'Tiger Prawns, orange ',
		'Clam, green shell ',
		'Clam, white shell, ribbed ',
		'Octopus ',
		'Squid, black ',
		'Squid, hard shell ',
		'Squid, red ',
		'Squid, white, small ',
		'Catla ',
		'Freshwater Eel ',
		'Gold fish ',
		'Pangas ',
		'Rohu ',
		'Crab',
		'Prawns, big ',
		'Prawns, small ',
		'Tiger prawns ',
		'Coconut oil ',
		'Corn oil ',
		'Cotton seed oil ',
		'Gingelly oil ',
		'Groundnut oil ',
		'Mustard oil ',
		'Palm oil ',
		'Rice bran oil ',
		'Safflower oil ',
		'Safflower oil (blended) ',
		'Soyabean oil ',
		'Sunflower oil ',
		'Ghee ',
		'Vanaspati '
	];
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [ detailsOpen, setDetailsOpen ] = useState(false);
	const [ searchInput, setSearchInput ] = useState('');
	const [ items, setItems ] = useState([]);
	const [ quantities, setQuantities ] = useState([]);
	const [totalWeight , setTotalWeight] = useState(0);

	const [ totalFat, setTotalFat ] = useState(0);
	const [ totalEnergy, setTotalEnergy ] = useState(0);
	const [ totalProt, setTotalProt ] = useState(0);
	const [ totalCarb, setTotalCarb ] = useState(0);
	const [ totalD3, setTotalD3 ] = useState(0);
	const [ totalIron, setTotalIron ] = useState(0);
	const [ totalA, setTotalA ] = useState(0);

	const [ itemSelected, setItemSelected ] = useState('');
	const [ quantity, setQuantity ] = useState(100);
	const [ ids, setIds ] = useState([]);

	const handleInputChange = (e) => {
		setSearchInput(e.target.value);
	};

	const handleQuantityChange = (e) => {
		setQuantity(e.target.value);
	};

	const roundNumber = (num) => {
		return Math.round((num + Number.EPSILON) * 100) / 100;
	};

	const postData = (e, q) => {
		if (searchInput.length > 0) {
			axios
				.post('https://lit-reef-57832.herokuapp.com/', {
					name: e
				})
				.then((res) => {
					if (res.status == 200) {
						let index = ids.indexOf(res.data.code);
						if (index != -1) {
							let newQuantities = [ ...quantities ];
							newQuantities[index] += q;
							setQuantities(newQuantities);
						} else {
							setItems([ ...items, res.data ]);
							setQuantities([ ...quantities, q ]);
							setIds([ ...ids, res.data.code ]);

							console.log(items);
						}

						setTotalEnergy(totalEnergy + res.data.enerc * (q / 100));
						setTotalD3(totalD3 + res.data.chocal * 1000000 * (q / 100));
						setTotalA(totalA + res.data.vita * 1000000 * (q / 100));
						setTotalProt(totalProt + res.data.protcnt * (q / 100));
						setTotalFat(totalFat + res.data.fatce * (q / 100));
						setTotalCarb(totalCarb + res.data.choavldf * (q / 100));
						setTotalIron(totalIron + res.data.fe * 1000 * (q / 100));
						setTotalWeight(totalWeight + q);
					}
				});
		}
	};

	return (
		<Flex justify="center" direction="column" align="center" m={2}>
			<Modal isOpen={detailsOpen} onClose={() => setDetailsOpen(false)}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Enter Quantity (g)</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Input value={quantity} onChange={handleQuantityChange} />
					</ModalBody>

					<ModalFooter>
						<Button variant="ghost" color="red" mr={3} onClick={() => setDetailsOpen(false)}>
							Close
						</Button>
						
					</ModalFooter>
				</ModalContent>
			</Modal>
			<TableContainer>
				<Table variant="striped">
					<Thead>
						<Tr>
							<Td textAlign="center" color="blackAlpha.600" fontSize="sm" fontWeight="bold">
								ITEM NAME
							</Td>
							<Td textAlign="center" color="blackAlpha.600" fontSize="sm" fontWeight="bold">
								QUANTITY (g)
							</Td>
							<Td textAlign="center" color="blackAlpha.600" fontSize="sm" isNumeric fontWeight="bold">
								Fat (g)
							</Td>
							<Td textAlign="center" color="blackAlpha.600" fontSize="sm" isNumeric fontWeight="bold">
								Energy (kJ)
							</Td>
							<Td textAlign="center" color="blackAlpha.600" fontSize="sm" isNumeric fontWeight="bold">
								Protein (g)
							</Td>
							<Td textAlign="center" color="blackAlpha.600" fontSize="sm" isNumeric fontWeight="bold">
								Carbohydrate (g)
							</Td>
							<Td textAlign="center" color="blackAlpha.600" fontSize="sm" isNumeric fontWeight="bold">
								Iron (mg)
							</Td>
							<Td textAlign="center" color="blackAlpha.600" fontSize="sm" isNumeric fontWeight="bold">
								Vit D3 (μg)
							</Td>
							<Td textAlign="center" color="blackAlpha.600" fontSize="sm" isNumeric fontWeight="bold">
								Vit A(μg)
							</Td>
						</Tr>
					</Thead>
					<Tbody>
						{items.map((item, index) => {
							let visible = true;
							return (
								visible && (
									<Tr
										key={item.code}
										visibility={visible ? 'visible' : 'hidden'}
										fontSize="sm"
										textAlign="center"
									>
										<Td textAlign="center">{item.name}</Td>
										<Td textAlign="center">{quantities[index]} </Td>
										<Td textAlign="center" isNumeric>
											{roundNumber(item.fatce * (quantities[index] / 100))}
										</Td>
										<Td textAlign="center" isNumeric>
											{roundNumber(item.enerc * (quantities[index] / 100))}
										</Td>
										<Td textAlign="center" isNumeric>
											{roundNumber(item.protcnt * (quantities[index] / 100))}
										</Td>
										<Td textAlign="center" isNumeric>
											{roundNumber(item.choavldf * (quantities[index] / 100))}
										</Td>
										<Td textAlign="center" isNumeric>
											{roundNumber(item.fe * 1000 * (quantities[index] / 100))}
										</Td>
										<Td textAlign="center" isNumeric>
											{roundNumber(item.chocal * 1000000 * (quantities[index] / 100))}
										</Td>
										<Td textAlign="center" isNumeric>
											{roundNumber(item.vita * 1000000 * (quantities[index] / 100))}
										</Td>
										<IconButton
											variant="ghost"
											color="teal"
											aria-label="Search database"
											icon={<FaInfoCircle />}
											onClick={() => setDetailsOpen(true)}
										/>
										<Button
											variant="ghost"
											colorScheme="red"
											onClick={() => {
												setTotalCarb(totalCarb - item.choavldf * (quantities[index] / 100));
												setTotalEnergy(totalEnergy - item.enerc * (quantities[index] / 100));
												setTotalProt(totalProt - item.protcnt * (quantities[index] / 100));
												setTotalFat(totalFat - item.fatce * (quantities[index] / 100));
												setTotalD3(totalD3 - item.chocal * 1000000 * (quantities[index] / 100));
												setTotalA(totalA - item.vita * 1000000 * (quantities[index] / 100));
												setTotalIron(totalIron - item.fe * 1000 * (quantities[index] / 100));
												setTotalWeight(totalWeight - quantities[index])
												let newItems = [ ...items ];
												newItems.splice(index, 1);
												let newQuantities = [ ...quantities ];
												newQuantities.splice(index, 1);
												let newIds = [ ...ids ];
												newIds.splice(index, 1);
												setIds(newIds);
												setItems(newItems);
												setQuantities(newQuantities);
												visible = false;
											}}
										>
											x
										</Button>
									</Tr>
								)
							);
						})}
					</Tbody>
					<Tfoot>
						<Tr>
							<Th>Total</Th>
							<Th fontSize="sm" textAlign="center">{roundNumber(totalWeight)}</Th>
							<Th fontSize="sm" textAlign="center" isNumeric>
								{roundNumber(totalFat)}{' '}
							</Th>
							<Th fontSize="sm" textAlign="center" isNumeric>
								{roundNumber(totalEnergy)}
							</Th>
							<Th fontSize="sm" textAlign="center" isNumeric>
								{roundNumber(totalProt)}
							</Th>
							<Th fontSize="sm" textAlign="center" isNumeric>
								{roundNumber(totalCarb)}
							</Th>
							<Th fontSize="sm" textAlign="center" isNumeric>
								{roundNumber(totalIron)}
							</Th>
							<Th fontSize="sm" textAlign="center" isNumeric>
								{roundNumber(totalD3)}
							</Th>
							<Th fontSize="sm" textAlign="center" isNumeric>
								{roundNumber(totalA)}
							</Th>
						</Tr>
						<Tr>
							<Th>Per 100g</Th>
							<Th fontSize="sm" textAlign="center">{totalWeight || 0}</Th>
							<Th fontSize="sm" textAlign="center" isNumeric>
								{roundNumber(100*(roundNumber(totalFat)/totalWeight)) || 0}{' '}
							</Th>
							<Th fontSize="sm" textAlign="center" isNumeric>
								{roundNumber(100*(roundNumber(totalEnergy)/totalWeight)) || 0}
							</Th>
							<Th fontSize="sm" textAlign="center" isNumeric>
								{roundNumber(100*(roundNumber(totalProt)/totalWeight)) || 0}
							</Th>
							<Th fontSize="sm" textAlign="center" isNumeric>
								{roundNumber(100*(roundNumber(totalCarb)/totalWeight)) || 0}
							</Th>
							<Th fontSize="sm" textAlign="center" isNumeric>
								{roundNumber(100*(roundNumber(totalIron)/totalWeight)) || 0}
							</Th>
							<Th fontSize="sm" textAlign="center" isNumeric>
								{roundNumber(100*(roundNumber(totalD3)/totalWeight)) || 0}
							</Th>
							<Th fontSize="sm" textAlign="center" isNumeric>
								{roundNumber(100*(roundNumber(totalA)/totalWeight)) || 0}
							</Th>
						</Tr>
						
					</Tfoot>
					<TableCaption>All data is collected from the official IFCT manual published in 2017.</TableCaption>
				</Table>
			</TableContainer>
			<FormControl align="center" mt="2">
				<Flex justify="center" w="50vw">
					<Input
						placeholder="Enter food ingreidient"
						autoComplete="off"
						value={searchInput}
						onChange={handleInputChange}
					/>
				</Flex>
			</FormControl>
			<UnorderedList mt={5}>
				{searchInput.length > 0 &&
					foods
						.filter(
							(item) =>
								item.toLowerCase().includes(searchInput.toLowerCase()) ||
								item.toLowerCase().startsWith(searchInput.toLowerCase())
						)
						.map((item) => {
							return (
								<Flex p={5} align="center" justify="space-between" listStyleType="none" key={item}>
									<ListItem key={item} fontSize="lg" id={item}>
										<ListIcon mr={6} as={FaPizzaSlice} color="green.500" />
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

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Enter Quantity (g)</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Input value={quantity} onChange={handleQuantityChange} />
					</ModalBody>

					<ModalFooter>
						<Button variant="ghost" color="red" mr={3} onClick={onClose}>
							Close
						</Button>
						<Button
							variant="solid"
							colorScheme="teal"
							onClick={() => {
								setSearchInput('');
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
		</Flex>
	);
}
