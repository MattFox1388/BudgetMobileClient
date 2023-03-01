import { BUDGET_API_URL } from '@env';
import axios from 'axios';

export async function setRecordCategories(token: string, data: any[]) {
    const response = await axios.post(
        BUDGET_API_URL + `/set_record_categories?token=${token}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 5000 
        });
      console.log(`response: ${response}`)
}

export async function getMonthRecordsUncat(token: string) {
    const response = await axios.get(
        BUDGET_API_URL + `/get_month_records_uncat?token=${token}`,
        {
          timeout: 8000,
        },
      );
      console.log(`response: ${response}`)
      return response;
}

//TODO: implement this
export async function ignoreMonthRecord(){
    return
}