import { useEffect, useState } from "react";
import styles from "../../css/productsOfTheWeek.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductsOfTheWeek = () => {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  const fetchProductsOfTheWeek = async () => {
    await axios
      .get("http://localhost:3344/productsOfTheWeek")
      .then((res) => {
        setDataSource(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    fetchProductsOfTheWeek();
  }, []);

  return (
    <div className={styles.powContainer}>
      <div className={styles.powContent}>
        <h1 className={styles.powTitle}>Products of the week</h1>
        <p className={styles.powTagLine}>
          The products that enhances the beauty of you home for the urban look
        </p>
      </div>
      <div className={styles.imageSection}>
        {dataSource.map((item, i) => (
          <div
            className={styles.productContainer}
            key={i}
            onClick={() => {
              navigate(`/products/${item.product_id}`);
            }}
          >
            <img className={styles.productImages} src={item.image_url} alt="" />
            <div className={styles.productImagesDesc}>
              <h2>{item.name}</h2>
              <p>{item.price} $</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsOfTheWeek;
