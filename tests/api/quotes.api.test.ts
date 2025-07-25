import { fetchQuotes, fetchQuoteById } from '../../src/index';
import { QuoteResponse } from '../../src/types/quote';

describe('Quote API', () => {
  it('should fetch quotes successfully', async () => {
    const quotes = await fetchQuotes();
    expect(quotes).toBeDefined();
    expect(quotes.docs.length).toBeGreaterThan(0);
  });

  it('should fetch quotes with a filter', async () => {
    const filteredQuotes: QuoteResponse = await fetchQuotes({ filter: 'dialog=/pass/i' });
    expect(filteredQuotes).toBeDefined();
    expect(filteredQuotes.docs.length).toBeGreaterThan(0);
    filteredQuotes.docs.forEach(quote => {
      expect(quote.dialog).toMatch(/pass/i);
    });
  });

  it('should fetch a single quote by ID', async () => {
    const quoteId = '5cd96e05de30eff6ebcced57'; // Example ID for a quote
    const quote: QuoteResponse = await fetchQuoteById(quoteId);
    expect(quote).toBeDefined();
    expect(quote.docs.length).toBe(1);
    expect(quote.docs[0]._id).toBe(quoteId);
  });
});