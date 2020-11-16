// make sure the page is within [1, totalPage]
export const getLogicalPage = (currentPage: number, totalPage: number) => {
  let logicalPage = currentPage > totalPage ? totalPage : currentPage;
  logicalPage = logicalPage < 1 ? 1 : logicalPage;
  return logicalPage;
};

export const getStartEndPage = ({
  currentPage,
  totalPage,
  span
}: {
  currentPage: number;
  totalPage: number;
  span: number;
}) => {
  let startPage = 1;
  let endPage = totalPage;
  const double = (input: number) => input + input;
  const COUNT_FOR_START_CUR_END = 3;

  // 1(startPage) + span + 1(currentPage) + span + 1(endPage) < totalPage
  if (totalPage > double(span) + COUNT_FOR_START_CUR_END) {
    if (currentPage <= double(span)) {
      endPage = double(span) + 1;
    } else if (currentPage + double(span) > totalPage) {
      startPage = totalPage - double(span) - 1;
    } else {
      startPage = currentPage - span;
      endPage = currentPage + span;
    }
  }

  return [startPage, endPage];
};
