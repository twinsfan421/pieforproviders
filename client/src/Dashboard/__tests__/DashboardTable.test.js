import React from 'react'
import { render, screen, waitFor } from 'setupTests'
import DashboardTable from '../DashboardTable'

const doRender = (
  props = {
    tableData: [],
    userState: '',
    setActiveKey: () => {},
    dateFilterValue: undefined
  }
) => {
  return render(<DashboardTable {...props} />)
}

describe('<DashboardTable />', () => {
  it('renders the DashboardTable component', async () => {
    const { container } = doRender()
    await waitFor(() => {
      expect(screen.getAllByRole('columnheader').length).toEqual(8)
      expect(container).toHaveTextContent('Child name')
      expect(container).toHaveTextContent('Case number')
      expect(container).toHaveTextContent('Attendance rate')
      expect(container).toHaveTextContent('Earned revenue')
      expect(container).toHaveTextContent('Max. approved revenue')
      expect(container).toHaveTextContent('Actions')
    })
  })

  it('renders the DashboardTable component for NE users', async () => {
    const { container } = doRender({
      tableData: [],
      userState: 'NE',
      setActiveKey: () => {},
      dateFilterValue: undefined
    })
    await waitFor(() => {
      expect(container).toHaveTextContent('Child')
      expect(container).toHaveTextContent('Full days')
      expect(container).toHaveTextContent('Hours')
      expect(container).toHaveTextContent('Hours attended')
      expect(container).toHaveTextContent('Absences')
      expect(container).toHaveTextContent('Earned revenue')
      expect(container).toHaveTextContent('Estimated revenue')
      expect(container).toHaveTextContent('Family fee')
      expect(container).toHaveTextContent('Authorized period')
      expect(container).toHaveTextContent('Total hours remaining')
      expect(container).toHaveTextContent('Total days remaining')
      expect(container).toHaveTextContent('Actions')
    })
  })

  it('renders the DashboardTable component without weekly attended hours for NE users in prior months', async () => {
    const { container } = doRender({
      tableData: [],
      userState: 'NE',
      setActiveKey: () => {},
      dateFilterValue: {
        date: new Date().setMonth(new Date().getMonth() - 1),
        displayDate: 'string'
      }
    })
    await waitFor(() => {
      expect(container).toHaveTextContent('Child')
      expect(container).toHaveTextContent('Full days')
      expect(container).toHaveTextContent('Hours')
      expect(container).not.toHaveTextContent('Hours attended')
      expect(container).toHaveTextContent('Absences')
      expect(container).toHaveTextContent('Earned revenue')
      expect(container).toHaveTextContent('Estimated revenue')
      expect(container).toHaveTextContent('Family fee')
      expect(container).toHaveTextContent('Authorized period')
      expect(container).toHaveTextContent('Total hours remaining')
      expect(container).toHaveTextContent('Total days remaining')
      expect(container).toHaveTextContent('Actions')
    })
  })
})
