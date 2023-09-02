import { SafeAreaView } from "react-native";
import axios from 'axios';
import { useCallback, useEffect, useState } from "react";

const Home = () => {
    const [cardData, setCardData] = useState();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);

    const handlePrevPage = () => {
        if(page>0) {
            setPage(prevPage => prevPage-1);
        }
    }

    const handleNextPage = () => {
        setPage(prevPage => prevPage+1);
    }

    const fetchCardData = useCallback(async () => {
        try {
          setLoading(true);
          const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?num=49&offset=${page * 49}`);
          const jsonData = response.data;
          setCardData(jsonData.data);
        } catch (error) {
          console.log('Ocorreu um erro:', error);
        } finally {
          setLoading(false);
        }
      }, [page]);

      useEffect(() => {
        fetchCardData()
      }, [fetchCardData]);
    

    return (
        <SafeAreaView>

        </SafeAreaView>
    );
}

export default Home;