const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#4a47a3",borderRadius:"12px" }}
      onClick={onClick}
    />
  );
};

export default PrevArrow;
