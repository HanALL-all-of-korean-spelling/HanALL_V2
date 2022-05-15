import React from "react";

function InfoListPage() {
  const spellings = [
    {
      _index: "words",
      _type: "_doc",
      _id: "1",
      _score: 0.53899646,
      _source: {
        title: "베개 vs 배게",
        hit: 124,
      },
    },
    {
      _index: "words",
      _type: "_doc",
      _id: "2",
      _score: 0.53899646,
      _source: {
        title: "왠지 vs 웬지",
        hit: 14,
      },
    },
    {
      _index: "words",
      _type: "_doc",
      _id: "3",
      _score: 0.53899646,
      _source: {
        title: "웬만하면 vs 왠만하면",
        hit: 114,
      },
    },
  ];

  const renderSpellings =
    spellings &&
    spellings.map((spelling) => {
      return (
        <div key={spelling._id}>
          <div>{spelling._source.title}</div>
          <div>{spelling._source.hit}</div>
        </div>
      );
    });

  return <>{renderSpellings}</>;
}

export default InfoListPage;
