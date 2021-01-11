import { ServeItem, ServeListParams } from '/pages/serve/data';
import { parse } from 'url';
import { Request, Response } from 'express';

const genServeList = (current: number, pageSize: number) => {
  const userList: ServeItem[] = [];
  for (let i = 0; i < pageSize; i+=1 ) {
    const index = (current -1)* 10 +i;
    userList.push({
      id: index,
      name: `报表01${index}`,
      code: `xx${index}`,
      visualType: index % 3,
      timeBased: index % 5,
      status:  'EDIT',
      updatedAt: new Date(),
      createdAt: new Date(),
    })
  }
  userList.reverse();
  return userList;
}
let serveListDataSource = genServeList(1, 20);
function getServes(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = (parse(realUrl, true).query as unknown) as ServeListParams;

  let dataSource = [...serveListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const sorter = JSON.parse(params.sorter as any);
  if (sorter) {
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
  }
  const result = {
    data: dataSource,
    total: serveListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };
  return res.json(result);
}

export default {
  '/api/serves': getServes,
}