import React from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';

const ProductVariants = ({ variants }) => {
  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={variants}
      renderItem={(item) => (
        <List.Item
          actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.picture} />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.description}
            />
            <div>content</div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default ProductVariants;
