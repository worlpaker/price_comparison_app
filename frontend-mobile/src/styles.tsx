import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    main: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 100,
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
        fontSize: 30,
        paddingBottom: 20,
        color: "black",
    },
    row: {
        display: "flex",
        position: "relative",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    searchbar: {
        display: "flex",
        position: "relative",
        borderRadius: 15,
        backgroundColor: "lightgray",
        width: 220,
        height: 42,
        marginRight: 50,
    },
    search: {
        display: "flex",
        position: "relative",
        textAlign: "center",
        paddingLeft: 10,
        margin: "auto",
        paddingTop: -10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    search_input: {
        display: "flex",
        position: "relative",
        backgroundColor: "transparent",
        color: "#303030",
    },
    search_button: {
        display: "flex",
        position: "relative",
        marginLeft: 100,
        width: 90,
        height: 42,
        backgroundColor: "#3C99F0",
        borderRadius: 20,
        textAlign: "center",
        overflow: "hidden",
        alignItems: "center",
        padding: 10,
    },
    search_text: {
        color: "#fff"
    },
    table: {
        margin: 30,
        borderStyle: "solid",
        borderColor: "#D3D3D3",
        borderWidth: 1,
        width: 350,
        height: 90,

    },
    table_rows: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    table_headers: {
        borderColor: "#D3D3D3",
        display: "flex",
        position: "relative",
        width: 87.2,
        height: 30,
        borderStyle: "solid",
        borderRightWidth: 1,
        borderBottomWidth: 1,
        justifyContent: "center",
        margin: "auto",
        alignItems: "center",
    },
    table_headers_text: {
        color: "#000000",
        fontWeight: "600",
    },
    table_columns: {
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    table_content: {
        borderColor: "#D3D3D3",
        display: "flex",
        position: "relative",
        width: 87.2,
        height: 30,
        borderStyle: "solid",
        borderRightWidth: 1,
        borderBottomWidth: 1,
        justifyContent: "center",
        margin: "auto",
        alignItems: "center",
    },
    table_content_text: {
        color: "#000000",
    },
    loading_text: {
        display: "flex",
        position: "relative",
        color: "#000000",
        margin: "auto",
        fontSize: 30,
        paddingTop: 20,
        paddingLeft: 140,
    }
});
