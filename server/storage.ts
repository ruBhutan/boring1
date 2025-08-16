
import { db } from "./db";
import type {
  Tour,
  Booking,
  Inquiry,
  Guide,
  Itinerary,
  ItineraryDay,
  CustomTourRequest,
  TourOperator,
  Festival,
  FestivalBooking,
  Hotel,
  HotelRoom,
  HotelBooking,
  UserAccount,
  UserFeedback,
  Testimonial,
  BlogPost
} from "@prisma/client";

export class DatabaseStorage {
  // Tours
  async getAllTours(): Promise<Tour[]> {
    return await db.tour.findMany({
      include: {
        tourOperator: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getActiveTours(): Promise<Tour[]> {
    return await db.tour.findMany({
      where: { isActive: true },
      include: {
        tourOperator: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getTour(id: number): Promise<Tour | null> {
    return await db.tour.findUnique({
      where: { id },
      include: {
        tourOperator: true,
        bookings: true,
        itineraries: true
      }
    });
  }

  async getToursByCategory(category: string): Promise<Tour[]> {
    return await db.tour.findMany({
      where: { 
        categoryName: category,
        isActive: true 
      },
      include: {
        tourOperator: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createTour(tourData: Omit<Tour, 'id'>): Promise<Tour> {
    return await db.tour.create({
      data: tourData,
      include: {
        tourOperator: true
      }
    });
  }

  async updateTour(id: number, updates: Partial<Tour>): Promise<Tour | null> {
    try {
      return await db.tour.update({
        where: { id },
        data: updates,
        include: {
          tourOperator: true
        }
      });
    } catch {
      return null;
    }
  }

  async deleteTour(id: number): Promise<boolean> {
    try {
      await db.tour.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  // Hotels
  async getAllHotels(): Promise<Hotel[]> {
    return await db.hotel.findMany({
      include: {
        rooms: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getActiveHotels(): Promise<Hotel[]> {
    return await db.hotel.findMany({
      where: { isActive: true },
      include: {
        rooms: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getHotel(id: number): Promise<Hotel | null> {
    return await db.hotel.findUnique({
      where: { id },
      include: {
        rooms: true,
        bookings: true
      }
    });
  }

  async createHotel(hotelData: Omit<Hotel, 'id' | 'createdAt'>): Promise<Hotel> {
    return await db.hotel.create({
      data: hotelData,
      include: {
        rooms: true
      }
    });
  }

  async updateHotel(id: number, updates: Partial<Hotel>): Promise<Hotel | null> {
    try {
      return await db.hotel.update({
        where: { id },
        data: updates,
        include: {
          rooms: true
        }
      });
    } catch {
      return null;
    }
  }

  async deleteHotel(id: number): Promise<boolean> {
    try {
      await db.hotel.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  // Festivals
  async getAllFestivals(): Promise<Festival[]> {
    return await db.festival.findMany({
      include: {
        festivalBookings: true,
        tourFestivals: true
      },
      orderBy: { createdAt: 'asc' }
    });
  }

  async getActiveFestivals(): Promise<Festival[]> {
    return await db.festival.findMany({
      where: { isActive: true },
      include: {
        festivalBookings: true,
        tourFestivals: true
      },
      orderBy: { createdAt: 'asc' }
    });
  }

  async getFestival(id: number): Promise<Festival | null> {
    return await db.festival.findUnique({
      where: { id },
      include: {
        festivalBookings: true,
        tourFestivals: true
      }
    });
  }

  async createFestival(festivalData: Omit<Festival, 'id' | 'createdAt'>): Promise<Festival> {
    return await db.festival.create({
      data: festivalData,
      include: {
        festivalBookings: true,
        tourFestivals: true
      }
    });
  }

  async updateFestival(id: number, updates: Partial<Festival>): Promise<Festival | null> {
    try {
      return await db.festival.update({
        where: { id },
        data: updates,
        include: {
          festivalBookings: true,
          tourFestivals: true
        }
      });
    } catch {
      return null;
    }
  }

  async deleteFestival(id: number): Promise<boolean> {
    try {
      await db.festival.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  // Testimonials
  async getActiveTestimonials(): Promise<Testimonial[]> {
    return await db.testimonial.findMany({
      where: { isActive: true },
      orderBy: { id: 'desc' }
    });
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.testimonial.findMany({
      orderBy: { id: 'desc' }
    });
  }

  async createTestimonial(testimonialData: Omit<Testimonial, 'id'>): Promise<Testimonial> {
    return await db.testimonial.create({
      data: testimonialData
    });
  }

  async updateTestimonial(id: number, updates: Partial<Testimonial>): Promise<Testimonial | null> {
    try {
      return await db.testimonial.update({
        where: { id },
        data: updates
      });
    } catch {
      return null;
    }
  }

  // Blog Posts
  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' }
    });
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.blogPost.findMany({
      orderBy: { publishedAt: 'desc' }
    });
  }

  async getBlogPost(id: number): Promise<BlogPost | null> {
    return await db.blogPost.findUnique({
      where: { id }
    });
  }

  async createBlogPost(blogData: Omit<BlogPost, 'id' | 'publishedAt'>): Promise<BlogPost> {
    return await db.blogPost.create({
      data: blogData
    });
  }

  async updateBlogPost(id: number, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    try {
      return await db.blogPost.update({
        where: { id },
        data: updates
      });
    } catch {
      return null;
    }
  }

  // Bookings
  async getAllBookings(): Promise<Booking[]> {
    return await db.booking.findMany({
      include: {
        tour: {
          include: {
            tourOperator: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createBooking(bookingData: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
    return await db.booking.create({
      data: bookingData,
      include: {
        tour: {
          include: {
            tourOperator: true
          }
        }
      }
    });
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | null> {
    try {
      return await db.booking.update({
        where: { id },
        data: { status },
        include: {
          tour: {
            include: {
              tourOperator: true
            }
          }
        }
      });
    } catch {
      return null;
    }
  }

  // Inquiries
  async getAllInquiries(): Promise<Inquiry[]> {
    return await db.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async createInquiry(inquiryData: Omit<Inquiry, 'id' | 'createdAt'>): Promise<Inquiry> {
    return await db.inquiry.create({
      data: inquiryData
    });
  }

  // Guides
  async getAllGuides(): Promise<Guide[]> {
    return await db.guide.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getAvailableGuides(type?: string): Promise<Guide[]> {
    return await db.guide.findMany({
      where: {
        status: 'not_assigned',
        ...(type && { registrationType: type })
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createGuide(guideData: Omit<Guide, 'id' | 'createdAt'>): Promise<Guide> {
    return await db.guide.create({
      data: guideData
    });
  }

  async updateGuideStatus(id: number, status: string): Promise<Guide | null> {
    try {
      return await db.guide.update({
        where: { id },
        data: { status }
      });
    } catch {
      return null;
    }
  }

  // User Accounts
  async getAllUserAccounts(): Promise<UserAccount[]> {
    return await db.userAccount.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getUserAccount(id: number): Promise<UserAccount | null> {
    return await db.userAccount.findUnique({
      where: { id },
      include: {
        feedbacks: true
      }
    });
  }

  async createUserAccount(userData: Omit<UserAccount, 'id' | 'createdAt' | 'lastLoginAt'>): Promise<UserAccount> {
    return await db.userAccount.create({
      data: userData
    });
  }

  async updateUserAccount(id: number, updates: Partial<UserAccount>): Promise<UserAccount | null> {
    try {
      return await db.userAccount.update({
        where: { id },
        data: updates
      });
    } catch {
      return null;
    }
  }

  // User Feedback
  async getAllUserFeedback(): Promise<UserFeedback[]> {
    return await db.userFeedback.findMany({
      include: {
        user: true,
        tour: true,
        itinerary: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getPublicFeedback(): Promise<UserFeedback[]> {
    return await db.userFeedback.findMany({
      where: { isPublic: true },
      include: {
        user: true,
        tour: true,
        itinerary: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getUserFeedbackByUser(userId: number): Promise<UserFeedback[]> {
    return await db.userFeedback.findMany({
      where: { userId },
      include: {
        tour: true,
        itinerary: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createUserFeedback(feedbackData: Omit<UserFeedback, 'id' | 'createdAt'>): Promise<UserFeedback> {
    return await db.userFeedback.create({
      data: feedbackData,
      include: {
        user: true,
        tour: true,
        itinerary: true
      }
    });
  }

  // Hotel Rooms
  async getHotelRooms(hotelId: number): Promise<HotelRoom[]> {
    return await db.hotelRoom.findMany({
      where: { hotelId },
      include: {
        hotel: true
      }
    });
  }

  async createHotelRoom(roomData: Omit<HotelRoom, 'id'>): Promise<HotelRoom> {
    return await db.hotelRoom.create({
      data: roomData,
      include: {
        hotel: true
      }
    });
  }

  async updateHotelRoom(id: number, updates: Partial<HotelRoom>): Promise<HotelRoom | null> {
    try {
      return await db.hotelRoom.update({
        where: { id },
        data: updates,
        include: {
          hotel: true
        }
      });
    } catch {
      return null;
    }
  }

  async deleteHotelRoom(id: number): Promise<boolean> {
    try {
      await db.hotelRoom.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  // Hotel Bookings
  async getAllHotelBookings(): Promise<HotelBooking[]> {
    return await db.hotelBooking.findMany({
      include: {
        hotel: true,
        room: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createHotelBooking(bookingData: Omit<HotelBooking, 'id' | 'createdAt'>): Promise<HotelBooking> {
    return await db.hotelBooking.create({
      data: bookingData,
      include: {
        hotel: true,
        room: true
      }
    });
  }

  async updateHotelBookingStatus(id: number, status: string): Promise<HotelBooking | null> {
    try {
      return await db.hotelBooking.update({
        where: { id },
        data: { status },
        include: {
          hotel: true,
          room: true
        }
      });
    } catch {
      return null;
    }
  }

  // Festival Bookings
  async getAllFestivalBookings(): Promise<FestivalBooking[]> {
    return await db.festivalBooking.findMany({
      include: {
        festival: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createFestivalBooking(bookingData: Omit<FestivalBooking, 'id' | 'createdAt'>): Promise<FestivalBooking> {
    return await db.festivalBooking.create({
      data: bookingData,
      include: {
        festival: true
      }
    });
  }

  async updateFestivalBookingStatus(id: number, status: string): Promise<FestivalBooking | null> {
    try {
      return await db.festivalBooking.update({
        where: { id },
        data: { status },
        include: {
          festival: true
        }
      });
    } catch {
      return null;
    }
  }

  // Itineraries
  async getAllItineraries(): Promise<Itinerary[]> {
    return await db.itinerary.findMany({
      include: {
        tour: true,
        guide: true,
        driver: true,
        days: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getItinerary(id: number): Promise<Itinerary | null> {
    return await db.itinerary.findUnique({
      where: { id },
      include: {
        tour: true,
        guide: true,
        driver: true,
        days: true
      }
    });
  }

  async getItineraryDays(itineraryId: number): Promise<ItineraryDay[]> {
    return await db.itineraryDay.findMany({
      where: { itineraryId },
      orderBy: { dayNumber: 'asc' }
    });
  }

  async createItinerary(itineraryData: Omit<Itinerary, 'id' | 'createdAt'>): Promise<Itinerary> {
    return await db.itinerary.create({
      data: itineraryData,
      include: {
        tour: true,
        guide: true,
        driver: true,
        days: true
      }
    });
  }

  async updateItinerary(id: number, updates: Partial<Itinerary>): Promise<Itinerary | null> {
    try {
      return await db.itinerary.update({
        where: { id },
        data: updates,
        include: {
          tour: true,
          guide: true,
          driver: true,
          days: true
        }
      });
    } catch {
      return null;
    }
  }

  async deleteItinerary(id: number): Promise<boolean> {
    try {
      await db.itinerary.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async createItineraryDay(dayData: Omit<ItineraryDay, 'id'>): Promise<ItineraryDay> {
    return await db.itineraryDay.create({
      data: dayData
    });
  }

  async updateItineraryDay(id: number, updates: Partial<ItineraryDay>): Promise<ItineraryDay | null> {
    try {
      return await db.itineraryDay.update({
        where: { id },
        data: updates
      });
    } catch {
      return null;
    }
  }

  async deleteItineraryDay(id: number): Promise<boolean> {
    try {
      await db.itineraryDay.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  // Custom Tour Requests
  async getAllCustomTourRequests(): Promise<CustomTourRequest[]> {
    return await db.customTourRequest.findMany({
      include: {
        assignedItinerary: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getCustomTourRequest(id: number): Promise<CustomTourRequest | null> {
    return await db.customTourRequest.findUnique({
      where: { id },
      include: {
        assignedItinerary: true
      }
    });
  }

  async createCustomTourRequest(requestData: Omit<CustomTourRequest, 'id' | 'createdAt'>): Promise<CustomTourRequest> {
    return await db.customTourRequest.create({
      data: requestData,
      include: {
        assignedItinerary: true
      }
    });
  }

  async updateCustomTourRequest(id: number, updates: Partial<CustomTourRequest>): Promise<CustomTourRequest | null> {
    try {
      return await db.customTourRequest.update({
        where: { id },
        data: updates,
        include: {
          assignedItinerary: true
        }
      });
    } catch {
      return null;
    }
  }
}

// Export the storage instance
export const storage = new DatabaseStorage();
