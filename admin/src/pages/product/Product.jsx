import {Link, useHistory, useLocation} from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import {Publish} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {userRequest} from "../../requestMethods";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import app from "../../firebase";
import {addProduct, updateProduct} from "../../redux/apiCalls";

export default function Product() {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [pStats, setPStats] = useState([]);
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    let history = useHistory();


    const product = useSelector((state) =>
        state.product.products.find((product) => product._id === productId)
    );

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("orders/income?pid=" + productId);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        {name: MONTHS[item._id - 1], Sales: item.total},
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [productId, MONTHS]);


    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleCat = (e) => {
        setCat(e.target.value.split(","));
    };


    const handleClick = (e) => {
        e.preventDefault();
        setLoading(true);
        if(file){
            const fileName = new Date().getTime() + file.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const product2 = {...product,...inputs,img: downloadURL , categories: `${cat.length !== 0 ? cat : product.categories }`};
                        updateProduct(product._id,product2, dispatch);
                        history.push("/products")
                    });

                }
            );
        }
        else{
            const product2 = {...product,...inputs , categories: cat};
            updateProduct(product._id,product2, dispatch);
            history.push("/products")
        }

    };


    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img} alt="" className="productInfoImg"/>
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id: </span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Name :</span>
                            <span className="productInfoValue">{product.title}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">{product.inStock ? "Yes" : "No"}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">categories:</span>
                            <span className="productInfoValue">{product.categories.toString()}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">price:</span>
                            <span className="productInfoValue">${product.price}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product brand</label>
                        <input type="text" name="brand" onChange={handleChange} placeholder={product.brand} />
                        <label>Product color</label>
                        <input type="text" name="color" onChange={handleChange} placeholder={product.color} />
                        <label>Product Description</label>
                        <input type="text"  name="desc"  onChange={handleChange} placeholder={product.desc} />
                        <label>Price</label>
                        <input type="number"  name="price" onChange={handleChange} placeholder={product.price} />
                        <label>Categories</label>
                        <input type="text"  name="price" onChange={handleCat} placeholder={product.categories.toString()} />
                        <label>In Stock</label>
                        <select name="inStock" style={{width:100}}   onChange={handleChange}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product.img} alt="" className="productUploadImg"/>
                            <label for="file">
                                <Publish/>
                            </label>
                            <input type="file" id="file" style={{display: "none"}}  onChange={(e) => setFile(e.target.files[0])}/>
                        </div>
                        <button className="productButton" type="submit" onClick={handleClick}>Update</button>
                    </div>

                </form>
            </div>
        </div>
    );
}
