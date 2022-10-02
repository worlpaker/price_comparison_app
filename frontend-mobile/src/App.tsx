import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Keyboard, Alert, Linking } from 'react-native';
import axios from 'axios';
import { IProduct, IData } from './data_model';
import { styles } from "./styles";

const App = () => {
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showdata, setShowdata] = useState<boolean>(false);
  const [data, setData] = useState<IData[]>();

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setLoading(true);
    await axios
      .post("http://10.0.2.2:8000/api/search", product)
      .then(res => ((setData(res.data), setShowdata(true))))
      .catch(err => handleError(err));
    setLoading(false);
  };

  const handleError = (err: string) => {
    console.log(`Error: ${err}`);
    Alert.alert("Error: Something went wrong");
  };

  const Tables = () => {
    const headers_Table: string[] = ["#", "Website", "Product", "Price(TL)"];

    return (
      <View style={styles.table}>
        <View style={styles.table_rows}>
          {
            headers_Table.map((value: string, index: number) => {
              return (
                <View key={index}>
                  <View style={styles.table_headers}>
                    <Text style={styles.table_headers_text}>{value}</Text>
                  </View>
                </View>
              );
            })
          }
        </View>
        <View style={styles.table_columns}>
          {data?.map((value: any, index: number) => {
            return (
              <View style={styles.table_rows} key={index} >
                <View style={styles.table_content}>
                  <Text style={styles.table_content_text}>{index + 1}</Text>
                </View>
                <View style={styles.table_content}>
                  <Text style={styles.table_content_text}>{value.website}</Text>
                </View>
                <View style={styles.table_content}>
                  <Text style={styles.table_content_text}>
                    <TouchableOpacity onPress={() => Linking.openURL(value.url)}>
                      <Text style={{ color: 'blue' }}>
                        Go Product
                      </Text>
                    </TouchableOpacity>
                  </Text>
                </View>
                <View style={styles.table_content}>
                  <Text style={styles.table_content_text}>{value.price}</Text>
                </View>
              </View>
            );
          })
          }
        </View>
      </View>

    );
  };

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <Text style={styles.header}>Compare Price</Text>
        <View style={styles.row}>
          <View style={styles.searchbar}>
            <View style={styles.search}>
              <TextInput
                style={styles.search_input}
                placeholder="Enter your product"
                onChangeText={Item => setProduct({ product: Item })}
              />
              <TouchableOpacity style={styles.search_button} onPress={handleSubmit}>
                <Text style={styles.search_text}>
                  Search
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View>
        {loading &&
          <Text style={styles.loading_text}>
            Loading...
          </Text>
        }
      </View>
      {!loading && showdata &&
        <Tables />
      }
    </SafeAreaView>
  );
};

export default App;
