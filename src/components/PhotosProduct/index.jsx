import { Carousel, Row, Col } from 'antd';

export const PhotosProduct = ({productById}) => {


    return(
        <>
            {productById.productPictures.length > 4 ? (
            <Carousel autoplay style={{marginBlock:"1rem"}}>
            {productById.productPictures.map((picture) => (
                <div>
                <img src={picture.url} alt="product" style={{ width: '100%', height: 'auto' }} />
                </div>
            ))}
            </Carousel>
        ) : (
            <Row gutter={16} style={{marginBlock:"1rem"}}>
            {productById.productPictures.map((picture) => (
                <Col span={6}>
                <img src={picture.url} alt="product" style={{ width: '100%', height: 'auto' }} />
                </Col>
            ))}
            </Row>
        )}
        </>
    )
}

export default PhotosProduct;
