import CTable from '../src/index'
import CTableColumn from '../src/column'
export default {
  template: `
    <c-table :dataSource="dataSource" :defaultSortInfo="defaultSortInfo" @sortChange="sortChange">
      <c-table-column type="expand" :width="60"/>
      <c-table-column title="TEST" prop="test">
        <template v-slot:title>
          <p>
            <span>custom thead</span>
          </p>
        </template>
        
        <c-table-column prop="cv" title="TEST11312cv" :width="200">
          here is cv~
        </c-table-column>
        <c-table-column prop="pv" title="TEST12312nv" :width="200"></c-table-column>
      </c-table-column>
      <c-table-column prop="uv" title="TEST412uv"  className="TEST" :width="200">
        <template v-slot="{row, index}">
          <div >
            <span @click="uvClick(index)">~~2~~{{row.uv}}~1~~</span>
          </div>
        </template>
      </c-table-column>
      
        <c-table-column prop="nv" title="TESTnv" :width="200" :hiden="true"/>
        <c-table-column prop="du" title="TESTuv"  :width="200" :sortable="true"/>
      
      <c-table-column prop="ip" title="TESTip"  :width="200" fixed="right">
        <c-table-column prop="type" title="TEST-type" :width="200"/>
      </c-table-column>
      <template v-slot:du_title>
        <span class="customTypeThead">
          来源分析
          <i>~!~</i>
        </span>
      </template>
      <template v-slot:expand="{row, index}">
        <p>I am here!</p>
      </template>
    </c-table>
  `,
  components: {
    CTable,
    CTableColumn
  },
  data() {
    return {
      defaultSortInfo: {
        column: 'uv',
        order: 'descending'
      },
      dataSource: [
        {
          type: '直接访问1',
          pv: 1,
          uv: 2,
          nv: 3,
          du: 4,
          cv: 5,
          ip: 8
        },
        {
          type: '搜索引擎1',
          pv: 11,
          uv: 21,
          nv: 31,
          du: 141,
          cv: 51,
          ip: 81
        }
      ]
    }
  },
  methods: {
    sortChange({ column, order }) {
      console.log(column, order)
    },
    uvClick(index) {
      console.log('rowIndex:', index)
    }
  }
}
