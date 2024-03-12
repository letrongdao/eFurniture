import React, { useEffect, useState } from "react";
import { getFeedbackByProductId } from "../../dataControllers/feedbackController";
import { Divider, Typography, List, Avatar, Rate } from "antd";
import FeedbackForm from "../FeedbackForm/FeedbackModal";
import moment from "moment";
import styles from "../../css/related.module.css";

const FeedbackList = (record) => {
  const { Text } = Typography;
  const [feedbackList, setFeedbackList] = useState({
    feedback_id: "",
    fullName: "",
    description: "",
    rating: 0,
    createdAt: "",
  });

  useEffect(() => {
    getFeedbackByProductId(record.product).then((res) => {
      const getFeedbackList = res.map((item) => ({
        feedback_id: item.feedback_id,
        fullName: item.fullName,
        description: item.description,
        rating: item.rating,
        createdAt: item.createdAt,
      }));
      setFeedbackList(getFeedbackList);
      console.log("ADADA: ", getFeedbackList);
    });
  }, []);

  return (
    <>
      <div>
        <Divider orientation="left">
          <Text className={styles.title}>FEEDBACK</Text>
        </Divider>
        {feedbackList.length > 0 ? (
          <div style={{ marginLeft: "20px" }}>
            <List
              itemLayout="horizontal"
              dataSource={[...feedbackList]}
              // loading={newCommentIncoming}
              size="small"
              renderItem={(feedback) => (
                <List.Item
                  style={{
                    padding: "16px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    marginLeft: "50px",
                    marginBottom: "16px",
                    width: "1000px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <span
                      style={{ minWidth: "max-content", marginRight: "16px" }}
                    >
                      <Avatar src={feedback.user?.avatar} alt="" size={45} />
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ marginBottom: "1px" }}>
                        <strong>{feedback.fullName}</strong>
                      </div>
                      <div>
                        <Rate
                          style={{ fontSize: "15px", color: "red" }}
                          disabled
                          defaultValue={feedback.rating}
                        />
                      </div>
                      <div style={{ fontSize: "70%", marginBottom: "10px" }}>
                        {moment(feedback.createdAt).fromNow()}
                      </div>
                      <div style={{ lineHeight: "1.5" }}>
                        {feedback.description}
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        ) : (
          <div style={{ margin: "10px auto" }}>
            <Text style={{ marginLeft: "70px" }} italic>
              There is no feedback on this yet.
            </Text>
          </div>
        )}
      </div>
      <FeedbackForm product={record.product} />
    </>
  );
};

export default FeedbackList;
