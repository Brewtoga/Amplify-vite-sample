import React, { useState } from 'react';
import './Employee.css';

interface Employee {
  id: string;
  name: string;
  role: 'bartender' | 'cook';
}

interface Shift {
  id: string;
  employeeId: string;
  employeeName: string;
  role: 'bartender' | 'cook';
  date: string;
  startTime: string;
  endTime: string;
  needsCoverage?: boolean;
  coverageReason?: string;
}

interface PTORequest {
  id: string;
  employeeName: string;
  requestDate: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'denied';
}

interface CoverageRequest {
  id: string;
  employeeName: string;
  shiftDate: string;
  shiftTime: string;
  reason: string;
  status: 'open' | 'covered';
  requestDate: string;
}

interface EmployeeProps {
  userName: string;
  onBackToMenu?: () => void;
}

const Employee: React.FC<EmployeeProps> = ({ userName, onBackToMenu }) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'coverage' | 'pto'>('schedule');
  const [showPTOForm, setShowPTOForm] = useState(false);
  const [showCoverageForm, setShowCoverageForm] = useState(false);
  const [ptoRequests, setPtoRequests] = useState<PTORequest[]>([]);
  const [coverageRequests, setCoverageRequests] = useState<CoverageRequest[]>([]);

  // Employee data
  const employees: Employee[] = [
    // Spanish Bartenders (sassy/hot names)
    { id: '1', name: 'Esperanza "Espi" Rodriguez', role: 'bartender' },
    { id: '2', name: 'Catalina "Cat" Fuego', role: 'bartender' },
    { id: '3', name: 'Isabella "Izzy" Caliente', role: 'bartender' },
    { id: '4', name: 'Valentina "Val" Picante', role: 'bartender' },
    { id: '5', name: 'Camila "Cami" Soleado', role: 'bartender' },
    // French Cooks
    { id: '6', name: 'Pierre Dubois', role: 'cook' },
    { id: '7', name: 'Jacques Moreau', role: 'cook' },
    { id: '8', name: 'Antoine Lefebvre', role: 'cook' },
    { id: '9', name: 'Émile Rousseau', role: 'cook' },
    { id: '10', name: 'Claude Beaumont', role: 'cook' }
  ];

  // Generate sample schedule for current and next week
  const generateSchedule = (): Shift[] => {
    const schedule: Shift[] = [];
    const today = new Date();
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay()); // Start of current week (Sunday)
    
    // Generate 2 weeks of schedule
    for (let week = 0; week < 2; week++) {
      for (let day = 0; day < 7; day++) {
        const shiftDate = new Date(currentWeekStart);
        shiftDate.setDate(currentWeekStart.getDate() + (week * 7) + day);
        const dateStr = shiftDate.toISOString().split('T')[0];
        
        // Morning shifts (9am-5pm)
        const morningBartender = employees.filter(e => e.role === 'bartender')[day % 5];
        const morningCook = employees.filter(e => e.role === 'cook')[day % 5];
        
        schedule.push({
          id: `${week}-${day}-morning-bar`,
          employeeId: morningBartender.id,
          employeeName: morningBartender.name,
          role: 'bartender',
          date: dateStr,
          startTime: '09:00',
          endTime: '17:00'
        });
        
        schedule.push({
          id: `${week}-${day}-morning-cook`,
          employeeId: morningCook.id,
          employeeName: morningCook.name,
          role: 'cook',
          date: dateStr,
          startTime: '09:00',
          endTime: '17:00'
        });
        
        // Evening shifts (5pm-12am)
        const eveningBartender = employees.filter(e => e.role === 'bartender')[(day + 2) % 5];
        const eveningCook = employees.filter(e => e.role === 'cook')[(day + 2) % 5];
        
        schedule.push({
          id: `${week}-${day}-evening-bar`,
          employeeId: eveningBartender.id,
          employeeName: eveningBartender.name,
          role: 'bartender',
          date: dateStr,
          startTime: '17:00',
          endTime: '00:00'
        });
        
        schedule.push({
          id: `${week}-${day}-evening-cook`,
          employeeId: eveningCook.id,
          employeeName: eveningCook.name,
          role: 'cook',
          date: dateStr,
          startTime: '17:00',
          endTime: '00:00'
        });
      }
    }
    
    return schedule;
  };

  const [schedule] = useState<Shift[]>(generateSchedule());

  const currentEmployee = employees.find(emp => emp.name.toLowerCase().includes(userName.toLowerCase())) || employees[0];
  
  const getWeekDates = (weekOffset: number = 0) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (weekOffset * 7));
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getMyShifts = (weekOffset: number = 0) => {
    const weekDates = getWeekDates(weekOffset);
    const weekStart = weekDates[0].toISOString().split('T')[0];
    const weekEnd = weekDates[6].toISOString().split('T')[0];
    
    return schedule.filter(shift => 
      shift.employeeId === currentEmployee.id &&
      shift.date >= weekStart &&
      shift.date <= weekEnd
    );
  };

  const submitPTORequest = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newRequest: PTORequest = {
      id: Date.now().toString(),
      employeeName: currentEmployee.name,
      requestDate: new Date().toISOString().split('T')[0],
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      reason: formData.get('reason') as string,
      status: 'pending'
    };
    
    setPtoRequests(prev => [...prev, newRequest]);
    setShowPTOForm(false);
    form.reset();
  };

  const submitCoverageRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newRequest: CoverageRequest = {
      id: Date.now().toString(),
      employeeName: currentEmployee.name,
      shiftDate: formData.get('shiftDate') as string,
      shiftTime: formData.get('shiftTime') as string,
      reason: formData.get('reason') as string,
      status: 'open',
      requestDate: new Date().toISOString().split('T')[0]
    };
    
    setCoverageRequests(prev => [...prev, newRequest]);
    setShowCoverageForm(false);
    form.reset();
  };

  return (
    <div className="employee-container">
      {onBackToMenu && (
        <div className="back-to-menu">
          <button className="back-to-menu-btn" onClick={onBackToMenu}>
            ← Back to Judy's Pub Menu
          </button>
        </div>
      )}

      <div className="employee-dashboard">
        <div className="employee-header">
          <h1>👥 Employee Dashboard</h1>
          <div className="employee-info">
            <span className="employee-name">Welcome, {currentEmployee.name}</span>
            <span className="employee-role">{currentEmployee.role.charAt(0).toUpperCase() + currentEmployee.role.slice(1)}</span>
          </div>
        </div>

        <div className="employee-tabs">
          <button 
            className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            📅 My Schedule
          </button>
          <button 
            className={`tab-btn ${activeTab === 'coverage' ? 'active' : ''}`}
            onClick={() => setActiveTab('coverage')}
          >
            🔄 Shift Coverage
          </button>
          <button 
            className={`tab-btn ${activeTab === 'pto' ? 'active' : ''}`}
            onClick={() => setActiveTab('pto')}
          >
            🏖️ PTO Requests
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'schedule' && (
            <div className="schedule-section">
              <div className="schedule-header">
                <h2>Weekly Schedule</h2>
                <p className="schedule-note">📋 Schedule released every Friday for current and following week</p>
              </div>
              
              {[0, 1].map(weekOffset => (
                <div key={weekOffset} className="week-schedule">
                  <h3>{weekOffset === 0 ? 'Current Week' : 'Next Week'}</h3>
                  <div className="schedule-grid">
                    <div className="schedule-header-row">
                      <div className="time-slot">Time</div>
                      {getWeekDates(weekOffset).map((date, index) => (
                        <div key={index} className="day-header">
                          {formatDate(date)}
                        </div>
                      ))}
                    </div>
                    
                    {getMyShifts(weekOffset).length > 0 ? (
                      getMyShifts(weekOffset).map(shift => (
                        <div key={shift.id} className="shift-row">
                          <div className="shift-time">
                            {shift.startTime} - {shift.endTime}
                          </div>
                          <div className="shift-details">
                            <span className="shift-role">{shift.role}</span>
                            <span className="shift-date">{new Date(shift.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-shifts">No shifts scheduled this week</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'coverage' && (
            <div className="coverage-section">
              <div className="section-header">
                <h2>Shift Coverage Requests</h2>
                <button 
                  className="primary-btn"
                  onClick={() => setShowCoverageForm(true)}
                >
                  + Request Coverage
                </button>
              </div>

              {showCoverageForm && (
                <div className="modal-overlay" onClick={() => setShowCoverageForm(false)}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h3>Request Shift Coverage</h3>
                    <form onSubmit={submitCoverageRequest}>
                      <div className="form-group">
                        <label>Shift Date:</label>
                        <input type="date" name="shiftDate" required />
                      </div>
                      <div className="form-group">
                        <label>Shift Time:</label>
                        <select name="shiftTime" required>
                          <option value="">Select shift time</option>
                          <option value="09:00-17:00">Morning (9:00 AM - 5:00 PM)</option>
                          <option value="17:00-00:00">Evening (5:00 PM - 12:00 AM)</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Reason:</label>
                        <textarea name="reason" rows={3} required placeholder="Please explain why you need coverage..."></textarea>
                      </div>
                      <div className="form-actions">
                        <button type="button" onClick={() => setShowCoverageForm(false)}>Cancel</button>
                        <button type="submit" className="primary-btn">Submit Request</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="requests-list">
                {coverageRequests.length > 0 ? (
                  coverageRequests.map(request => (
                    <div key={request.id} className="request-card">
                      <div className="request-header">
                        <span className="request-employee">{request.employeeName}</span>
                        <span className={`status-badge ${request.status}`}>{request.status}</span>
                      </div>
                      <div className="request-details">
                        <p><strong>Date:</strong> {new Date(request.shiftDate).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {request.shiftTime}</p>
                        <p><strong>Reason:</strong> {request.reason}</p>
                        <p><strong>Requested:</strong> {new Date(request.requestDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-requests">No coverage requests at this time</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'pto' && (
            <div className="pto-section">
              <div className="section-header">
                <h2>PTO Requests</h2>
                <button 
                  className="primary-btn"
                  onClick={() => setShowPTOForm(true)}
                >
                  + Request PTO
                </button>
              </div>

              {showPTOForm && (
                <div className="modal-overlay" onClick={() => setShowPTOForm(false)}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h3>Submit PTO Request</h3>
                    <form onSubmit={submitPTORequest}>
                      <div className="form-group">
                        <label>Start Date:</label>
                        <input type="date" name="startDate" required />
                      </div>
                      <div className="form-group">
                        <label>End Date:</label>
                        <input type="date" name="endDate" required />
                      </div>
                      <div className="form-group">
                        <label>Reason:</label>
                        <textarea name="reason" rows={3} required placeholder="Vacation, personal, medical, etc..."></textarea>
                      </div>
                      <div className="form-actions">
                        <button type="button" onClick={() => setShowPTOForm(false)}>Cancel</button>
                        <button type="submit" className="primary-btn">Submit Request</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="requests-list">
                {ptoRequests.length > 0 ? (
                  ptoRequests.map(request => (
                    <div key={request.id} className="request-card">
                      <div className="request-header">
                        <span className="request-employee">{request.employeeName}</span>
                        <span className={`status-badge ${request.status}`}>{request.status}</span>
                      </div>
                      <div className="request-details">
                        <p><strong>Dates:</strong> {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}</p>
                        <p><strong>Reason:</strong> {request.reason}</p>
                        <p><strong>Submitted:</strong> {new Date(request.requestDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-requests">No PTO requests submitted</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employee;