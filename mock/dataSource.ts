import { DataSoureItem, DataSourceParams } from '@/pages/dw/data';
import { parse } from 'url';
import { Request, Response } from 'express';

const getDataSourceList = (current: number, pageSize: number) => {
  const dsList: DataSoureItem[] = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    dsList.push({
      id: index,
      name: `数据源01${index}`,
      type: 'MySQL',
      status: 0,
      jdbcUrl: 'xxx',
      username: 'xind',
      canDdl: index % 2,
      readOnly: index % 2,
      sync: index % 2,
      updatedAt: new Date(),
      createdAt: new Date(),
    })
  }
  dsList.reverse();
  return dsList;
}
let dsListDataSource = getDataSourceList(1, 2);

function getDs(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = (parse(realUrl, true).query as unknown) as DataSourceParams;

  let dataSource = [...dsListDataSource].slice(
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
    total: dsListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };
  return res.json(result);
}

function saveDataSource(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = (parse(realUrl, true).query as unknown) as DataSoureItem;

  let msg = '添加数据源成功';
  if( params.id !== undefined) {
    msg = '修改数据源成功';
  }

  dsListDataSource.push(params);

  const result = {
    code: 200,
    message: msg,
  };
  return res.json(result);
}

export default {
  '/api/ds/list': getDs,
  '/api/ds/save': saveDataSource,
}