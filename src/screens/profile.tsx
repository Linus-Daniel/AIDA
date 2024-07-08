import React, { useState, useContext } from 'react';
import {
	View,
	Text,
	ScrollView,
	Image,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import image from '../assets/user.png';
import ChangeValue from '@/components/addvalue';
import { UserContext } from '@/context/userDataContext';

const Profile = () => {
	const { width } = Dimensions.get('window');
	const navigation = useNavigation();
	const { userDetails } = useContext(UserContext);

	// Example data for profile items
	const [items, setItems] = useState([
		{
			title: 'Blood Type',
			value: 'O+',
		},
		{
			title: 'Weight',
			value: '64kg',
		},
		{
			title: 'Height',
			value: '25cm',
		},
		{
			title: 'Birthday',
			value: '11 Nov 2000',
		},
		{
			title: 'Sex',
			value: 'Male',
		},
		{
			title: 'Marriage status',
			value: 'Single',
		},
	]);

	// State for managing modal visibility and selected item index
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedItemIndex, setSelectedItemIndex] = useState(null);

	// Function to update item value
	const handleUpdateValue = (index, newValue) => {
		const updatedItems = [...items];
		updatedItems[index].value = newValue;
		setItems(updatedItems);
		setModalVisible(false); // Close modal after saving
	};

	// Function to show modal for editing
	const showInputDialog = (index:String, initialValue:String) => {
		setSelectedItemIndex(index);
		setModalVisible(true);
	};

	// Function to close modal without saving changes
	const closeModal = () => {
		setSelectedItemIndex(null);
		setModalVisible(false);
	};

	// Render each item in profile view
	const renderItem = (item, index) => (
		<TouchableOpacity
			key={index}
			style={{
				backgroundColor: '#F9F6F4',
				width: 150,
				height: 150,
				padding: 10,
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: 20,
			}}
			onPress={() => showInputDialog(index, item.value)}
		>
			<Text style={{ color: 'black', fontSize: 20 }}>{item.title}</Text>
			<Text style={{ color: '#9A9896', fontSize: 15 }}>{item.value}</Text>
		</TouchableOpacity>
	);

	return (
		<ScrollView style={{ backgroundColor: 'white' }}>
			{/* Header Section */}
			<View
				style={{
					marginVertical: 20,
					marginHorizontal: 20,
					padding: 4,
					flexDirection: 'row',
					gap: width / 3,
				}}
			>
				<TouchableOpacity
					style={{
						backgroundColor: '#EF873D',
						paddingHorizontal: 10,
						paddingVertical: 5,
						borderRadius: 8,
					}}
					onPress={() => navigation.goBack()}
				>
					<Text style={{ color: 'white', fontSize: 15 }}>Back</Text>
				</TouchableOpacity>
				<Text style={{ color: '#F87413' }}>Profile</Text>
			</View>

			{/* Profile Info Section */}
			<View
				style={{
					flexDirection: 'row',
					backgroundColor: '#F9F6F4',
					alignItems: 'center',
					marginHorizontal: 10,
					paddingHorizontal: 20,
					gap: 10,
				}}
			>
				<Image
					source={image}
					style={{ width: 100, height: 100, borderRadius: 20 }}
				/>
				<View style={{}}>
					{userDetails ? (
						<>
							<Text style={{ fontSize: 25, fontWeight: 'bold' }}>
								{userDetails.name}
							</Text>
							<Text style={{ color: '#9A9896', fontSize: 15 }}>
								{userDetails.email}
							</Text>
						</>
					) : (
						<Text>No user details found</Text>
					)}
				</View>
			</View>

			{/* Editable Items Section */}
			<View
				style={{
					flexWrap: 'wrap',
					paddingHorizontal: 40,
					flexDirection: 'row',
					marginTop: 40,
					gap: 30,
				}}
			>
				{items.map((item, index) => renderItem(item, index))}
			</View>

			{/* Modal for Editing */}
			<ChangeValue
				visible={modalVisible}
				initialValue={
					selectedItemIndex !== null ? items[selectedItemIndex].value : ''
				}
        cardTitle={selectedItemIndex !== null ? items[selectedItemIndex].title : ''}
				onSave={(newValue:String) =>
					handleUpdateValue(selectedItemIndex, newValue)
				}
				onCancel={closeModal}
			/>
		</ScrollView>
	);
};

export default Profile;
