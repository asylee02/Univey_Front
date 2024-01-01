import axios from 'axios';
import { useState } from 'react';

export default function BoardAPI() {
    const [data, setData] = useState();
        axios.get('/data/Board.json')
            .then((res) => {
                setData(res.data.items);
            })
            .catch((error) => {
                // 에러 처리
                console.error('Error fetching data:', error);
            });
  return ( {data} )
}
